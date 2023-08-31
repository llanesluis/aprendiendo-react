import { Button, Stack } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import Question from './Question'

export default function Game() {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <Stack gap={2}>
      <Question info={questionInfo} />

      <Button variant='outlined'>Siguiente pregunta</Button>
    </Stack>
  )
}
