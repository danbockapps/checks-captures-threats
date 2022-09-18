import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { FC, useContext } from 'react'
import './help.scss'
import HelpBoard from './HelpBoard'
import { MainContext } from './Main'
import theme from './theme'

const color = theme.palette.secondary.main

const Help: FC = () => {
  const cx = useContext(MainContext)

  return (
    <Dialog
      className='help mobile-only'
      open={cx.helpOpen}
      onClose={() => cx.setHelpOpen(false)}
      scroll='paper'
    >
      <DialogContent>
        <Typography variant='h5'>Here's what you're looking for.</Typography>

        <HelpBoard
          title='1. Checks'
          position='6k1/6pp/5p2/2r5/6N1/5B2/5PPP/5K2 w - - 0 1'
          customArrows={[
            { color, start: 'g4', end: 'h6' },
            { color, start: 'g4', end: 'f6' },
            { color, start: 'f3', end: 'd5' },
          ]}
        />

        <HelpBoard
          title='2. Captures'
          position='6k1/5pp1/3q3p/p6Q/8/8/5PPP/6K1 w - - 0 1'
          customArrows={[
            { color, start: 'h5', end: 'a5' },
            { color, start: 'h5', end: 'f7' },
            { color, start: 'h5', end: 'h6' },
          ]}
        />

        <HelpBoard
          title='3. Threats with a piece worth less'
          position='2k5/2r4p/6p1/PP6/8/2B1N3/6P1/5K2 w - - 0 1'
          customArrows={[
            { color, start: 'b5', end: 'b6' },
            { color, start: 'c3', end: 'e5' },
            { color, start: 'e3', end: 'd5' },
          ]}
        />

        <HelpBoard
          title='4. Threats of undefended pieces'
          position='8/3k1b2/p7/8/PR4P1/8/3K1B2/7r w - - 0 1'
          customArrows={[
            { color, start: 'b4', end: 'b6' },
            { color, start: 'b4', end: 'b1' },
            { color, start: 'b4', end: 'f4' },
          ]}
        />
      </DialogContent>

      <DialogActions>
        <Button variant='contained' color='primary' onClick={() => cx.setHelpOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Help
