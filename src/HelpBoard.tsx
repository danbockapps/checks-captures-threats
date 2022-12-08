import { Typography, useTheme } from '@mui/material'
import { FC, useContext } from 'react'
import { Arrow, Chessboard } from 'react-chessboard'
import { MainContext } from './Main'

interface Props {
  title: string
  position: string
  customArrows: Arrow[]
}

const HelpBoard: FC<Props> = props => {
  const cx = useContext(MainContext)
  const theme = useTheme()

  return (
    <>
      <Typography variant='h5' className='board-title'>
        {props.title}
      </Typography>
      <Chessboard
        boardWidth={(cx.screenWidth || 200) * 0.7}
        position={props.position}
        customArrows={props.customArrows}
        customLightSquareStyle={{ backgroundColor: theme.palette.primary.light }}
        customDarkSquareStyle={{ backgroundColor: theme.palette.primary.dark }}
      />
    </>
  )
}

export default HelpBoard
