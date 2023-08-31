import { useQuestionsStore } from '../store/questions'

export default function useQuestionsInfo() {
  const { questions } = useQuestionsStore()

  const completed = questions.filter((question) => {
    const { userSelectedAnswer } = question

    if (userSelectedAnswer != null) return question
  }).length

  const correct = questions.filter((question) => {
    const { isCorrectUserAnswer } = question

    if (isCorrectUserAnswer === true) return question
  }).length

  return { questions, completed, correct }
}
