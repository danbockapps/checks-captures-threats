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
      customArrows={[
        ...(selectedSquare && currentArrowEnd ? [[selectedSquare, currentArrowEnd]] : []),
        ...props.moves.map(squaresFromMove(position || '')),
      ]}
    />
  )
}

export default Board
