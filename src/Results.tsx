import { Button, Chip, Typography } from '@mui/material'
import { Chess } from 'chess.js'
import { FC } from 'react'
import { getChecksCapturesThreats } from './functions/checksCapturesThreats'
import './results.scss'

interface Props {
  position?: string // TODO remove the ? maybe
  moves: string[]
  onClick: () => void
}

const Results: FC<Props> = props => {
  const missed = getChecksCapturesThreats(new Chess(props.position)).filter(
    m => !props.moves.includes(m),
  )
  return (
    <div className='results'>
      <Typography className='summary'>
        {missed.length > 0 ? 'You missed:' : 'Got them all!'}
      </Typography>
      <div className='missed-list'>
        {missed.map(m => (
          <Chip key={m} label={m} color='error' className='missed-chip' />
        ))}
      </div>
      <Button onClick={props.onClick} className='next'>
        Next
      </Button>
    </div>
  )
}

export default Results
