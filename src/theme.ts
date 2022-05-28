import { blueGrey, deepOrange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    mode: 'dark',
    background: { default: blueGrey[900] },
    primary: { light: blueGrey[100], main: blueGrey[100], dark: blueGrey[300] },

    // User-drawn arrows
    secondary: { main: blueGrey[900] },

    // Correct moves
    success: { main: blueGrey[300] },

    // Missed results
    warning: { main: deepOrange[500] },
  },
})
