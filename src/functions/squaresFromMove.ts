import { Chess, Square } from 'chess.js'

const squaresFromMoves =
  (fen: string) =>
  (move: string): Square[] => {
    const verboseMove = new Chess(fen).moves({ verbose: true }).find(m => m.san === move)
    return verboseMove ? [verboseMove.from, verboseMove.to] : []
  }

export default squaresFromMoves
