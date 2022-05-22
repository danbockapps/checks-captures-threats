import { parse, ParseTree } from '@mliebelt/pgn-parser'
import { Chess, Square } from 'chess.js'
import { FC, useEffect, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import squaresFromMove from './functions/squaresFromMove'
import getRandomFen from './functions/getRandomFen'

interface Props {
  moves: string[]
  addMove: (move: string) => void
}

const Board: FC<Props> = props => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  const [currentArrowEnd, setCurrentArrowEnd] = useState<Square>()
  const [chessboardSize, setChessboardSize] = useState<number>()

  //TODO this is probably more state variables than is necessary.
  // const [games, setGames] = useState<ParseTree[]>([])
  const [position, setPosition] = useState<string>()

  useEffect(() => {
    fetch('https://lichess.org/api/games/user/imandrastoth?max=20')
      .then(response => response.text())
      .then(pgn => {
        const newGames = parse(pgn, { startRule: 'games' }) as ParseTree[]
        setPosition(getRandomFen(newGames))
        // setGames(newGames)
      })
  }, [])

  useEffect(() => {
    const handleResize = () =>
      setChessboardSize((document.getElementsByClassName('app')[0] as HTMLElement).offsetWidth)

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      boardWidth={chessboardSize}
      onTouchEnd={onMoveEnd}
      onTouchMove={s => s !== selectedSquare && setCurrentArrowEnd(s)}
      onTouchStart={onMoveStart}
      customArrows={[
        ...(selectedSquare && currentArrowEnd ? [[selectedSquare, currentArrowEnd]] : []),
        ...props.moves.map(squaresFromMove(position || '')),
      ]}
    />
  )
}

export default Board
