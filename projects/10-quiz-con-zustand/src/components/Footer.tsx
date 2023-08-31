import { Button, Stack } from '@mui/material'
import useQuestionsInfo from '../hooks/useQuestionsInfo'
import { useQuestionsStore } from '../store/questions'

export default function Footer() {
  const { questions, completed, correct } = useQuestionsInfo()
  const resetGame = useQuestionsStore((state) => state.resetGame)

  return (
    <footer>
      <Stack direction='row' gap={3} justifyContent='center' sx={{ marginTop: 2 }}>
        <strong>{`Completadas: ${completed}/${questions.length}`}</strong>
        <strong>{`Correctas: ${correct}/${questions.length}`}</strong>
      </Stack>
      <br />
      <Button onClick={resetGame}>Volver al inicio</Button>
    </footer>
  )
}
