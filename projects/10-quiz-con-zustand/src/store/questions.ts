import { create } from 'zustand'
import { type Question } from '../types.d'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
}

export const useQuestionsStore = create<State>((set) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit) => {
      const res = await fetch('http://localhost:5173/data.json')
      const data = await res.json()

      //Como solo queremos un numero limitado de preguntas, este truco permite tomar la cantidad definida desordenada
      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)

      set({ questions })
    },
  }
})
