import { Chip, Typography } from '@mui/material'
import { Chess } from 'chess.js'
import { FC, useState } from 'react'
import './app.scss'
import Board from './Board'
import Bottom from './Bottom'
import usePosition from './functions/usePosition'
import './moves.scss'

const Main: FC = () => {
  const [moves, setMoves] = useState<string[]>([])
  const [mode, setMode] = useState<Mode>('playing')
  const { position, next } = usePosition()

  const reset = () => {
    setMoves([])
    setMode('playing')
    next()
  }

  return (
    <>
      <div className='app'>
        <Typography variant='h5' className='header'>
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
          disabled={mode === 'results'}
        />

        <Bottom {...{ mode, setMode, position, moves, reset }} />
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

export type Mode = 'playing' | 'results'

export default Main
