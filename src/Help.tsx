import { Button, Dialog, DialogActions, Typography, useTheme } from '@mui/material'
import { FC, useContext } from 'react'
import { Chessboard } from 'react-chessboard'
import { MainContext } from './Main'

const Help: FC = () => {
  const cx = useContext(MainContext)
  const theme = useTheme()

  return (
    <Dialog open={cx.helpOpen} onClose={() => cx.setHelpOpen(false)} scroll='paper'>
      <Typography variant='h2'>Checks</Typography>
      <Chessboard
        position='6k1/6pp/5p2/2r5/6N1/5B2/5PPP/5K2 w - - 0 1'
        customArrowColor={theme.palette.secondary.main}
        customLightSquareStyle={{ backgroundColor: theme.palette.primary.light }}
        customDarkSquareStyle={{ backgroundColor: theme.palette.primary.dark }}
        customArrows={[
          ['g4', 'h6'],
          ['g4', 'f6'],
          ['f3', 'd5'],
        ]}
      />
      <DialogActions>
        <Button onClick={() => cx.setHelpOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Help
