import { Chip, Typography } from '@mui/material'
import { Chess } from 'chess.js'
import { createContext, FC, useState } from 'react'
import './app.scss'
import Board from './Board'
import Bottom from './Bottom'
import usePosition from './functions/usePosition'
import './moves.scss'

export type Mode = 'playing' | 'results'

interface MainContextType {
  moves: string[]
  mode: Mode
  setMode: (mode: Mode) => void
  reset: () => void
  position?: string
}

export const MainContext = createContext<MainContextType>({
  moves: [],
  mode: 'playing',
  setMode: () => {},
  reset: () => {},
})

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
    <MainContext.Provider value={{ moves, mode, setMode, reset, position }}>
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
              className='move-chip'
            />
          ))}
        </div>

        <Board addMove={(move: string) => setMoves(dedupe([...moves, move]))} />

        <Bottom />
      </div>
      <div className='mouse'>
        <Typography>This app works on touchscreen devices only. Try it on your phone!</Typography>
      </div>
    </MainContext.Provider>
  )
}

function dedupe<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

export default Main
