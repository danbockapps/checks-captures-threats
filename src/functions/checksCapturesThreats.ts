import { Chess, ChessInstance, PieceType } from 'chess.js'

export const getChecksCapturesThreats = (ch: ChessInstance) =>
  Array.from(new Set([...getChecks(ch), ...getCaptures(ch), ...getThreats(ch), ...getMateInOneThreat(ch)]))

const getChecks = (ch: ChessInstance) => ch.moves().filter(m => m.includes('+'))

const getCaptures = (ch: ChessInstance) =>
  ch
    .moves({ verbose: true })
    .filter(m => m.flags.includes('c'))
    .map(m => m.san)

const getThreats = (chess: ChessInstance) => {
  const movesSet = new Set(chess.moves().map(withoutCheck))

  return chess
    .moves({ verbose: true })
    .filter(m1 => {
      const ch2 = new Chess(chess.fen())
      ch2.move(m1.san)
      ch2.load(switchTurn(ch2.fen()))

      return (
        ch2
          .moves({ verbose: true })

          // Exclude moves that were already legal in the original. We only want new threats.
          .filter(m2 => !movesSet.has(withoutCheck(m2.san)))

          .some(m2 => {
            // Attack with something worth less
            if (m1.to === m2.from && m2.captured && greaterValueThan(m2.captured, m2.piece))
              return true

            // Attack something undefended
            if (m2.captured) {
              const ch3 = new Chess(ch2.fen())
              ch3.move(m2.san)
              return !ch3.moves({ verbose: true }).some(m3 => m2.to === m3.to)
            } else return false
          })
      )
    })
    .map(m => m.san)
}

const getMateInOneThreat = (chess: ChessInstance) => {

  return chess
  .moves({ verbose: true })
  .filter((m1) => {
    if (!m1.san.includes('+')) {
      const ch2 = new Chess(chess.fen());
      ch2.move(m1.san);
      ch2.load(switchTurn(ch2.fen())); 

      return ch2.moves({ verbose: true }).some(m2 => m2.san.includes('#'));  
    } else {
      return false; // Remove moves that are checks
    }
  })
  .map(m => m.san);
}

const greaterValueThan = (p1: PieceType, p2: PieceType) => {
  if (p1 === 'k' && p2 !== 'k') return true
  else if (p1 === 'q' && ['r', 'b', 'n', 'p'].includes(p2)) return true
  else if (p1 === 'r' && ['b', 'n', 'p'].includes(p2)) return true
  else if (['b', 'n'].includes(p1) && p2 === 'p') return true
  else return false
}

const switchTurn = (fen: string) =>
  fen
    .split(' ')
    .map((token, i) => {
      if (i === 1) return token === 'w' ? 'b' : 'w'
      else if (i === 3) return '-'
      else return token
    })
    .join(' ')

// Just like when we use toUpperCase to compare strings case-insensitively, we use this to
// compare moves check-insensitively.
const withoutCheck = (move: string) => move.replace('+', '')
