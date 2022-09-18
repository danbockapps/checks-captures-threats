import { useTheme } from '@mui/material'
import { Chess, Square } from 'chess.js'
import { FC, useContext, useState } from 'react'
import { Arrow, Chessboard } from 'react-chessboard'
import squaresFromMove from './functions/squaresFromMove'
import { MainContext } from './Main'

interface Props {
  addMove: (move: string) => void
}

const Board: FC<Props> = props => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  const [currentArrowEnd, setCurrentArrowEnd] = useState<Square>()
  const cx = useContext(MainContext)

  const theme = useTheme()

  const onMoveStart = (square: Square) => setSelectedSquare(square)
  const onMoveEnd = (square: Square) => {
    if (selectedSquare) {
      // should always be true
      setCurrentArrowEnd(undefined)
      const ch = new Chess(cx.position)
      const move = ch.move({ from: selectedSquare, to: square })
      if (move) props.addMove(move.san)
      setSelectedSquare(undefined)
    }
  }

  const [onTouchStart, onTouchMove, onTouchEnd] = cx.answers
    ? [undefined, undefined, undefined]
    : [onMoveStart, (s: Square) => s !== selectedSquare && setCurrentArrowEnd(s), onMoveEnd]

  return (
    <Chessboard
      animationDuration={0}
      position={cx.position}
      boardWidth={(cx.screenWidth || 0) * (cx.answers ? 0.9 : 1)}
      {...{ onTouchStart, onTouchMove, onTouchEnd }}
      customArrows={[
        ...(selectedSquare && currentArrowEnd
          ? [{ color: theme.palette.secondary.main, start: selectedSquare, end: currentArrowEnd }]
          : []),
        ...(cx.moves.map(squaresFromMove(cx.position || '')).filter(c => c) as Arrow[]),
      ]}
      customLightSquareStyle={{ backgroundColor: theme.palette.primary.light }}
      customDarkSquareStyle={{ backgroundColor: theme.palette.primary.dark }}
    />
  )
}

export default Board
