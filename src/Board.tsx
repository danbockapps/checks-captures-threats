import { useTheme } from '@mui/material'
import { Chess, Square } from 'chess.js'
import { FC, useEffect, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import squaresFromMove from './functions/squaresFromMove'

interface Props {
  moves: string[]
  addMove: (move: string) => void
  position?: string
  disabled?: boolean
}

const Board: FC<Props> = props => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  const [currentArrowEnd, setCurrentArrowEnd] = useState<Square>()
  const [chessboardSize, setChessboardSize] = useState<number>()

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
      const ch = new Chess(props.position)
      const move = ch.move({ from: selectedSquare, to: square })
      if (move) props.addMove(move.san)
      setSelectedSquare(undefined)
    }
  }

  const [onTouchStart, onTouchMove, onTouchEnd] = props.disabled
    ? [undefined, undefined, undefined]
    : [onMoveStart, (s: Square) => s !== selectedSquare && setCurrentArrowEnd(s), onMoveEnd]

  return (
    <Chessboard
      animationDuration={0}
      position={props.position}
      boardWidth={chessboardSize}
      {...{ onTouchStart, onTouchMove, onTouchEnd }}
      customArrows={[
        ...(selectedSquare && currentArrowEnd ? [[selectedSquare, currentArrowEnd]] : []),
        ...props.moves.map(squaresFromMove(props.position || '')),
      ]}
      customArrowColor={theme.palette.secondary.main}
      customLightSquareStyle={{ backgroundColor: theme.palette.primary.light }}
      customDarkSquareStyle={{ backgroundColor: theme.palette.primary.dark }}
    />
  )
}

export default Board
