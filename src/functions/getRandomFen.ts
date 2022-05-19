import { ParseTree } from '@mliebelt/pgn-parser'
import { Chess } from 'chess.js'

const getRandomFen = (games: ParseTree[], startMove: number = 0) => {
  const game = games[Math.floor(Math.random() * games.length)]
  const moveNum = Math.floor(Math.random() * (game.moves.length - startMove)) + startMove

  const ch = new Chess()
  for (let i = 0; i <= moveNum; i++) {
    ch.move(game.moves[i].notation.notation)
  }

  return ch.fen()
}

export default getRandomFen
