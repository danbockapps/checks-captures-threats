import { FC, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'

interface Props {
  addMove: (move: string) => void
}

const Board: FC<Props> = props => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  const [currentArrowEnd, setCurrentArrowEnd] = useState<Square>()

  const position = '2r2rk1/pp2bp1p/1qb1pnp1/3nN1B1/3P4/P1NQ4/BP3PPP/2R2RK1 w Qq - 0 1'

  const onMoveStart = (square: Square) => setSelectedSquare(square)
  const onMoveEnd = (square: Square) => {
    if (selectedSquare) {
      // should always be true
      setCurrentArrowEnd(undefined)
      const ch = new Chess(position)
      const move = ch.move({ from: selectedSquare, to: square })
      if (move) props.addMove(move.san)
      setSelectedSquare(undefined)
    }
  }

  return (
    <Chessboard
      {...{ position }}
      boardWidth={400}
      onTouchEnd={onMoveEnd}
      onTouchMove={s => s !== selectedSquare && setCurrentArrowEnd(s)}
      onTouchStart={onMoveStart}
      customArrows={
        selectedSquare && currentArrowEnd ? [[selectedSquare, currentArrowEnd]] : undefined
      }
    />
  )
}

export default Board
