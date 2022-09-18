import { Chess, Square } from 'chess.js'
import theme from '../theme'
import { Arrow } from 'react-chessboard'

const squaresFromMoves =
  (fen: string) =>
  (move: string): Arrow | undefined => {
    const verboseMove = new Chess(fen).moves({ verbose: true }).find(m => m.san === move)
    return verboseMove
      ? { color: theme.palette.secondary.main, start: verboseMove.from, end: verboseMove.to }
      : undefined
  }

export default squaresFromMoves
