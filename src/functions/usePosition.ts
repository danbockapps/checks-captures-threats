import { parse, ParseTree } from '@mliebelt/pgn-parser'
import { useEffect, useState } from 'react'
import getRandomFen from './getRandomFen'

const usePosition = () => {
  //TODO this is probably more state variables than is necessary.
  const [position, setPosition] = useState<string>()
  const [games, setGames] = useState<ParseTree[]>([])

  useEffect(() => {
    fetch('Anand.pgn')
      .then(response => response.text())
      .then(pgn => {
        const newGames = parse(pgn, { startRule: 'games' }) as ParseTree[]
        setPosition(getRandomFen(newGames, 20))
        setGames(newGames)
      })
  }, [])

  const next = () => setPosition(getRandomFen(games, 20))

  return { position, next }
}

export default usePosition
