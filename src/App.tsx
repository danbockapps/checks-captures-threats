import { Chip, Typography } from '@mui/material'
import { FC, useState } from 'react'
import './app.scss'
import Board from './Board'
import DoneButton from './DoneButton'
import './moves.scss'
import usePosition from './functions/usePosition'
import { Chess } from 'chess.js'

const App: FC = () => {
  const [moves, setMoves] = useState<string[]>([])
  const { position, next } = usePosition()

  return (
    <>
      <div className='app'>
        <Typography variant='body1' className='header'>
          {new Chess(position).turn() === 'w' ? 'White' : 'Black'} to move. Find all the checks,
          captures, and threats.
        </Typography>

        <div className='moves'>
          {moves.map(m => (
            <Chip
              key={m}
              label={m}
              color='primary'
              onDelete={() => setMoves(moves.filter(move => move !== m))}
            />
          ))}
        </div>

        <Board
          {...{ position, moves }}
          addMove={(move: string) => setMoves(dedupe([...moves, move]))}
        />

        <DoneButton onClick={next} />
      </div>
      <div className='mouse'>
        <Typography>This app works on touchscreen devices only. Try it on your phone!</Typography>
      </div>
    </>
  )
}

function dedupe<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

export default App
