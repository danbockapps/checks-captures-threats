import { Button, Chip } from '@mui/material'
import { Chess } from 'chess.js'
import { FC } from 'react'
import './bottom.scss'
import DoneButton from './DoneButton'
import { getChecksCapturesThreats } from './functions/checksCapturesThreats'
import { Mode } from './Main'

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
      <>
        <div className='results'>
          {getChecksCapturesThreats(new Chess(props.position))
            .filter(m => !props.moves.includes(m))
            .map(m => (
              <Chip key={m} label={m} color='error' />
            ))}
        </div>
        <Button onClick={props.reset}>Next</Button>
      </>
    )}
  </div>
)

export default Bottom
