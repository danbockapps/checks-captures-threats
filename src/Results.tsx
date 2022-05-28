import { Button, Chip, Typography } from '@mui/material'
import { Chess } from 'chess.js'
import { FC, useContext } from 'react'
import { getChecksCapturesThreats } from './functions/checksCapturesThreats'
import './results.scss'
import { MainContext } from './Main'

const Results: FC = () => {
  const cx = useContext(MainContext)

  const missed = getChecksCapturesThreats(new Chess(cx.position)).filter(m => !cx.moves.includes(m))
  return (
    <div className='results'>
      <Typography className='summary'>
        {missed.length > 0 ? 'You missed:' : 'Got them all!'}
      </Typography>
      <div className='missed-list'>
        {missed.map(m => (
          <Chip key={m} label={m} color='warning' className='missed-chip' />
        ))}
      </div>
      <Button onClick={cx.reset} className='next'>
        Next
      </Button>
    </div>
  )
}

export default Results
