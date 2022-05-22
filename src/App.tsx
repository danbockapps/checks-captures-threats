import { Chip, Typography } from '@mui/material'
import { FC, useState } from 'react'
import './app.scss'
import Board from './Board'
import DoneButton from './DoneButton'
import './moves.scss'

const App: FC = () => {
  const [moves, setMoves] = useState<string[]>([])

  return (
    <>
      <div className='app'>
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
        <Board {...{ moves }} addMove={(move: string) => setMoves(dedupe([...moves, move]))} />
        <DoneButton />
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
