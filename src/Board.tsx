import { useTheme } from '@mui/material'
import { Chess, Square } from 'chess.js'
import { FC, useEffect, useState, useContext } from 'react'
import { Chessboard } from 'react-chessboard'
import squaresFromMove from './functions/squaresFromMove'
import { MainContext } from './Main'

interface Props {
  addMove: (move: string) => void
}

const Board: FC<Props> = props => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  const [currentArrowEnd, setCurrentArrowEnd] = useState<Square>()
  const [chessboardSize, setChessboardSize] = useState<number>()
  const cx = useContext(MainContext)

  useEffect(() => {
    const handleResize = () =>
      setChessboardSize((document.getElementsByClassName('app')[0] as HTMLElement).offsetWidth)

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      boardWidth={chessboardSize}
      {...{ onTouchStart, onTouchMove, onTouchEnd }}
      customArrows={[
        ...(selectedSquare && currentArrowEnd ? [[selectedSquare, currentArrowEnd]] : []),
        ...cx.moves.map(squaresFromMove(cx.position || '')),
      ]}
      customArrowColor={theme.palette.secondary.main}
      customLightSquareStyle={{ backgroundColor: theme.palette.primary.light }}
      customDarkSquareStyle={{ backgroundColor: theme.palette.primary.dark }}
    />
  )
}

export default Board
