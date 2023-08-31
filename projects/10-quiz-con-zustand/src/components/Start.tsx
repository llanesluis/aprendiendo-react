import { Button, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { useState } from 'react'

export default function Start() {
  const [isGameStarted, setIsGameStarted] = useState(false)

  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  return !isGameStarted ? (
    <Button onClick={() => setIsGameStarted(true)} color='info' variant='contained'>
      Comenzar juego
    </Button>
  ) : (
    <Stack gap={2}>
      <Typography component='h2' variant='h4'>
        Seleccione la dificultad:
      </Typography>
      <Stack gap={3} direction='row' justifyContent='center'>
        <Button onClick={() => fetchQuestions(4)} color='success' variant='contained'>
          Facil - 4
        </Button>
        <Button onClick={() => fetchQuestions(8)} color='warning' variant='contained'>
          Medio - 8
        </Button>
        <Button onClick={() => fetchQuestions(12)} color='error' variant='contained'>
          Dificil - 12
        </Button>
      </Stack>
    </Stack>
  )
}
