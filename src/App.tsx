import Board from './Board'
import Move from './Move'
import './moves.scss'
import { FC, useState } from 'react'

const App: FC = () => {
  const [moves, setMoves] = useState<string[]>(['Bxd5', 'Nxd5'])

  return (
    <div className='App'>
      <div className='moves'>
        {moves.map(m => (
          <Move onClick={() => setMoves(moves.filter(move => move !== m))}>{m}</Move>
        ))}
      </div>
      <Board />
    </div>
  )
}

export default App
