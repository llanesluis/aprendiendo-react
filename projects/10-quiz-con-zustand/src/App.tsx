import { Stack } from '@mui/material'
import './App.css'
import Game from './components/Game'
import Header from './components/Header'
import Start from './components/Start'
import { useQuestionsStore } from './store/questions'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Stack gap={2}>
        <Header />
        <main>
          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
        </main>
      </Stack>
    </ThemeProvider>
  )
}

export default App
