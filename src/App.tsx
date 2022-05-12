import Board from './Board'
import Move from './Move'
import './moves.scss'
import { FC } from 'react'

const moves = ['Bxd5', 'Nxd5']

const App: FC = () => {
  return (
    <div className='App'>
      <div className='moves'>
        {moves.map(m => (
          <Move>{m}</Move>
        ))}
      </div>
      <Board />
    </div>
  )
}

export default App
