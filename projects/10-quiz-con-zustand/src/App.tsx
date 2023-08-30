import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './components/Icons'

function App() {
  return (
    <>
      <header>
        <Container maxWidth={'sm'}>
          {/* El stack sirve para agrupar un conjunto de elementos */}
          <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
            <JavaScriptLogo />
            {/* component es para indicar que renderizar y variant para indicar como se ve */}
            <Typography component='h1' variant='h2'>
              JavaScript Quizz
            </Typography>
          </Stack>
        </Container>
      </header>
      <main></main>
    </>
  )
}

export default App
