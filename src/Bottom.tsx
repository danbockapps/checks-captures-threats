import { FC, useContext } from 'react'
import './bottom.scss'
import DoneButton from './DoneButton'
import { MainContext } from './Main'
import Results from './Results'

const Bottom: FC = () => {
  const cx = useContext(MainContext)

  return (
    <div className={`bottom bottom-${cx.missed ? 'results' : 'playing'}`}>
      {cx.missed ? <Results /> : <DoneButton onClick={cx.showResults} />}
    </div>
  )
}

export default Bottom
