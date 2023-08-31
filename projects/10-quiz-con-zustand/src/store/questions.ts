import { create } from 'zustand'
import { type Question } from '../types.d'
import { persist } from 'zustand/middleware'

interface State {
  loading: boolean
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  resetGame: () => void
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        loading: false,
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit) => {
          const res = await fetch('http://localhost:5173/data.json')
          const data = await res.json()

          //Como solo queremos un numero limitado de preguntas, este truco permite tomar la cantidad definida desordenada
          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)

          set({ questions })
        },
        selectAnswer: (questionId, answerIndex) => {
          //Con el metodo get accedemos al estado
          const { questions } = get()

          //Con structuredClone
          const newQuestions = structuredClone(questions)

          //Encontramos el indice de la pregunta
          const questionIndex = newQuestions.findIndex((question) => question.id === questionId)

          //Obtenemos la pregunta especifica y la info
          const questionInfo = newQuestions[questionIndex]

          //Determinamos si el indice de la resp escogida coincide con la resp correcta
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          }

          set({ questions: newQuestions })
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get()

          //Se incrementa el contador de las preguntas
          const nextQuestion = currentQuestion + 1

          //Mientras no sea la ultima pregunta se sigue incrementando
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get()

          //Se incrementa el contador de las preguntas
          const prevQuestion = currentQuestion - 1

          //Mientras no sea la ultima pregunta se sigue incrementando
          if (prevQuestion >= 0) {
            set({ currentQuestion: prevQuestion })
          }
        },
        resetGame: () => {
          set({ loading: false, questions: [], currentQuestion: 0 })
        },
      }
    },
    { name: 'questions' }
  )
)
