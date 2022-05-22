import { Button } from '@mui/material'
import { FC } from 'react'
import './done-button.scss'

const DoneButton: FC = () => (
  <div className='done-button'>
    <Button variant='contained'>Done</Button>
  </div>
)

export default DoneButton
