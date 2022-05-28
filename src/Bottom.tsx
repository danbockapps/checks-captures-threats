import { FC, useContext } from 'react'
import './bottom.scss'
import DoneButton from './DoneButton'
import { MainContext } from './Main'
import Results from './Results'

const Bottom: FC = () => {
  const context = useContext(MainContext)

  return (
    <div className={`bottom bottom-${context.mode}`}>
      {context.mode === 'playing' ? (
        <DoneButton onClick={() => context.setMode('results')} />
      ) : (
        <Results />
      )}
    </div>
  )
}

export default Bottom
