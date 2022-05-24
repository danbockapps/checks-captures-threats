import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { FC } from 'react'
import Main from './Main'
import theme from './theme'

const App: FC = () => (
  <ThemeProvider {...{ theme }}>
    <CssBaseline />
    <Main />
  </ThemeProvider>
)

export default App
