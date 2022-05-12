import { FC } from 'react'
import { Chessboard } from 'react-chessboard'

const Board: FC = () => {
  const position = '2r2rk1/pp2bp1p/1qb1pnp1/3nN1B1/3P4/P1NQ4/BP3PPP/2R2RK1 w Qq - 0 1'
  return <Chessboard {...{ position }} />
}

export default Board
