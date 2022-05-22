import { FC, useState } from 'react'
import Board from './Board'
import DoneButton from './DoneButton'
import Move from './Move'
import './moves.scss'
import './app.scss'

const App: FC = () => {
  const [moves, setMoves] = useState<string[]>([])

  return (
    <div className='app'>
      <div className='moves'>
        {moves.map(m => (
          <Move key={m} onClick={() => setMoves(moves.filter(move => move !== m))}>
            {m}
          </Move>
        ))}
      </div>
      <Board {...{ moves }} addMove={(move: string) => setMoves(dedupe([...moves, move]))} />
      <DoneButton />
    </div>
  )
}

function dedupe<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

export default App
