import { FC, useContext } from 'react'
import './bottom.scss'
import DoneButton from './DoneButton'
import { MainContext } from './Main'
import Results from './Results'

const Bottom: FC = () => {
  const cx = useContext(MainContext)

  return (
    <div className={`bottom bottom-${cx.answers ? 'results' : 'playing'}`}>
      {cx.answers ? <Results /> : <DoneButton onClick={cx.showResults} />}
    </div>
  )
}

export default Bottom
