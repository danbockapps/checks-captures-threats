import Board from './Board'
import Move from './Move'
import './moves.scss'

const moves = ['Bxd5', 'Nxd5']

function App() {
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
