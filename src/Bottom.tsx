import { FC } from 'react'
import './bottom.scss'
import DoneButton from './DoneButton'
import { Mode } from './Main'
import Results from './Results'

interface Props {
  mode: Mode
  setMode: (mode: Mode) => void
  position?: string // TODO remove the ? maybe
  moves: string[]
  reset: () => void
}

const Bottom: FC<Props> = props => (
  <div className={`bottom bottom-${props.mode}`}>
    {props.mode === 'playing' ? (
      <DoneButton onClick={() => props.setMode('results')} />
    ) : (
      <Results position={props.position} moves={props.moves} onClick={props.reset} />
    )}
  </div>
)

export default Bottom
