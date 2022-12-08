import { Chess } from 'chess.js'
import { Arrow } from 'react-chessboard'

const squaresFromMoves =
  (fen: string, color: string) =>
  (move: string): Arrow | undefined => {
    const verboseMove = new Chess(fen).moves({ verbose: true }).find(m => m.san === move)
    return verboseMove ? { color, start: verboseMove.from, end: verboseMove.to } : undefined
  }

export default squaresFromMoves
