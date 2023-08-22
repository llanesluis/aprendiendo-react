import { reducer } from '../reducer/reducer'
import { useReducer } from 'react'
import { FromLanguage, Language, State } from '../types'

export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fromLanguage, toLanguage, fromText, result, loading } = state

  const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  const setFromLang = (payload: FromLanguage) =>
    dispatch({ type: 'SET_FROM_LANGUAGE', payload: payload })
  const setToLang = (payload: Language) =>
    dispatch({ type: 'SET_TO_LANGUAGE', payload: payload })
  const setFromText = (payload: string) =>
    dispatch({ type: 'SET_FROM_TEXT', payload: payload })
  const setResult = (payload: string) =>
    dispatch({ type: 'SET_RESULT', payload: payload })

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLang,
    setToLang,
    setFromText,
    setResult,
  }
}
