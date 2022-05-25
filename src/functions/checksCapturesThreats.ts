import { Chess, ChessInstance, PieceType } from 'chess.js'

export const getChecksCapturesThreats = (ch: ChessInstance) =>
  Array.from(new Set([...getChecks(ch), ...getCaptures(ch), ...getAttacksWithLess(ch)]))

const getChecks = (ch: ChessInstance) => ch.moves().filter(m => m.includes('+'))

const getCaptures = (ch: ChessInstance) =>
  ch
    .moves({ verbose: true })
    .filter(m => m.flags.includes('c'))
    .map(m => m.san)

const getAttacksWithLess = (chess: ChessInstance) =>
  chess
    .moves({ verbose: true })
    .filter(m1 => {
      const ch2 = new Chess(chess.fen())
      ch2.move(m1.san)
      ch2.load(switchTurn(ch2.fen()))

      return ch2
        .moves({ verbose: true })
        .filter(m2 => m1.to === m2.from)
        .reduce<boolean>(
          (acc, m2) => acc || (!!m2.captured && greaterValueThan(m2.captured, m2.piece)),
          false,
        )
    })
    .map(m => m.san)

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
