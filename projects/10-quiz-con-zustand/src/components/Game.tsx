import { IconButton, Stack } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import Question from './Question'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import Footer from './Footer'

export default function Game() {
  //* Cuando se extraigan cosas del store es mejor ser especifico en que extraer
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion)

  //! No se hace una destructuracion porque forzas renderizados aun cuando lo que extraes no cambia
  //! cualquier cambio de toda la store provocaria un renderizado
  // const { questions, currentQuestion, goNextQuestion, goPreviousQuestion, resetGame } =
  //   useQuestionsStore()

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack gap={2}>
        <Stack direction='row' justifyContent='center' alignItems='center' gap={2}>
          <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
            <ArrowBackIosNew />
          </IconButton>
          {currentQuestion + 1}/{questions.length}
          <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
            <ArrowForwardIos />
          </IconButton>
        </Stack>
        <Question info={questionInfo} />
      </Stack>
      <Footer />
    </>
  )
}
