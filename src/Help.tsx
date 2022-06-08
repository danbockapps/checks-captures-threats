import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { FC, useContext } from 'react'
import './help.scss'
import HelpBoard from './HelpBoard'
import { MainContext } from './Main'

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
            ['g4', 'h6'],
            ['g4', 'f6'],
            ['f3', 'd5'],
          ]}
        />

        <HelpBoard
          title='2. Captures'
          position='6k1/5pp1/3q3p/p6Q/8/8/5PPP/6K1 w - - 0 1'
          customArrows={[
            ['h5', 'a5'],
            ['h5', 'f7'],
            ['h5', 'h6'],
          ]}
        />

        <HelpBoard
          title='3. Threats with a piece worth less'
          position='2k5/2r4p/6p1/PP6/8/2B1N3/6P1/5K2 w - - 0 1'
          customArrows={[
            ['b5', 'b6'],
            ['c3', 'e5'],
            ['e3', 'd5'],
          ]}
        />

        <HelpBoard
          title='4. Threats of undefended pieces'
          position='8/3k1b2/p7/8/PR4P1/8/3K1B2/7r w - - 0 1'
          customArrows={[
            ['b4', 'b6'],
            ['b4', 'b1'],
            ['b4', 'f4'],
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
