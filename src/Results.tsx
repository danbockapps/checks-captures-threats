import { Button, Chip, Typography } from '@mui/material'
import { FC, useContext } from 'react'
import { MainContext } from './Main'
import './results.scss'

const Results: FC = () => {
  const cx = useContext(MainContext)

  return cx.missed ? (
    <div className='results'>
      <Typography className='summary'>
        {cx.missed.length > 0 ? 'You missed:' : 'Got them all!'}
      </Typography>
      <div className='missed-list'>
        {cx.missed
          .filter(m => !cx.moves.includes(m))
          .map(m => (
            <Chip key={m} label={m} color='warning' className='missed-chip' />
          ))}
      </div>
      <Button onClick={cx.reset} className='next'>
        Next
      </Button>
    </div>
  ) : null
}

export default Results
