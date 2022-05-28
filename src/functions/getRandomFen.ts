import { ParseTree } from '@mliebelt/pgn-parser'
import { Chess } from 'chess.js'

const getRandomFen = (
  games: ParseTree[],
  startMove: number = 0,
  checksAllowed: boolean = false,
): string => {
  const game = games[Math.floor(Math.random() * games.length)]
  const moveNum = Math.floor(Math.random() * (game.moves.length - startMove)) + startMove

  const ch = new Chess()
  for (let i = 0; i <= moveNum; i++) {
    ch.move(game.moves[i].notation.notation)
  }

  return checksAllowed || !ch.in_check() ? ch.fen() : getRandomFen(games, startMove, checksAllowed)
}

export default getRandomFen
