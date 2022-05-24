import { parse, ParseTree } from '@mliebelt/pgn-parser'
import { useEffect, useState } from 'react'
import getRandomFen from './getRandomFen'

const usePosition = () => {
  //TODO this is probably more state variables than is necessary.
  const [position, setPosition] = useState<string>()
  const [games, setGames] = useState<ParseTree[]>([])

  useEffect(() => {
    fetch('https://lichess.org/api/games/user/imandrastoth?max=20')
      .then(response => response.text())
      .then(pgn => {
        const newGames = parse(pgn, { startRule: 'games' }) as ParseTree[]
        setPosition(getRandomFen(newGames))
        setGames(newGames)
      })
  }, [])

  const next = () => setPosition(getRandomFen(games))

  return { position, next }
}

export default usePosition
