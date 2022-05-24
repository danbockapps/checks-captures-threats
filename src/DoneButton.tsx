import { Button } from '@mui/material'
import { FC } from 'react'
import './done-button.scss'

interface Props {
  onClick: () => void
}

const DoneButton: FC<Props> = props => (
  <div className='done-button'>
    <Button variant='contained' onClick={props.onClick}>
      Done
    </Button>
  </div>
)

export default DoneButton
