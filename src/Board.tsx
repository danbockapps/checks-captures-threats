import { FC, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'

interface Props {
  addMove: (move: string) => void
}

const Board: FC<Props> = props => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  const [currentArrow, setCurrentArrow] = useState<[Square?, Square?]>()

  const position = '2r2rk1/pp2bp1p/1qb1pnp1/3nN1B1/3P4/P1NQ4/BP3PPP/2R2RK1 w Qq - 0 1'

  const onSquareClick = (square: Square) => {
    if (selectedSquare) {
      const ch = new Chess(position)
      const move = ch.move({ from: selectedSquare, to: square })
      if (move) props.addMove(move.san)
      setSelectedSquare(undefined)
    } else {
      setSelectedSquare(square)
    }
  }

  return (
    <Chessboard
      {...{ position, onSquareClick }}
      customSquareStyles={{ [selectedSquare as string]: { backgroundColor: 'yellow' } }}
      boardWidth={400}
      onTouchEnd={s => setCurrentArrow([currentArrow?.[0], s])}
      onTouchMove={s => setCurrentArrow([currentArrow?.[0], s])}
      onTouchStart={s => setCurrentArrow([s, undefined])}
      customArrows={currentArrow?.[0] && currentArrow?.[1] ? [currentArrow as Square[]] : undefined}
    />
  )
}

export default Board
