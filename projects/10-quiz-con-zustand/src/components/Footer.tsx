import { Stack } from '@mui/material'
import useQuestionsInfo from '../hooks/useQuestionsInfo'

export default function Footer() {
  const { questions, completed, correct } = useQuestionsInfo()
  return (
    <footer>
      <Stack direction='row' gap={3} justifyContent='center' sx={{ marginTop: 2 }}>
        <strong>{`Completadas: ${completed}/${questions.length}`}</strong>
        <strong>{`Correctas: ${correct}/${questions.length}`}</strong>
      </Stack>
    </footer>
  )
}
