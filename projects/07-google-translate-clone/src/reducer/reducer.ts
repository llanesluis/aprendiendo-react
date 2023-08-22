import { AUTO_LANGUAGE } from '../consts'
import { type State, type Action } from '../types'

export function reducer(state: State, action: Action) {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES': {
      if (
        state.fromLanguage === AUTO_LANGUAGE ||
        state.fromLanguage === state.toLanguage
      ) {
        return state
      }

      const loading = state.fromText !== ''

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText: state.result,
        result: '',
        loading,
      }
    }
    case 'SET_FROM_LANGUAGE': {
      if (state.fromLanguage === action.payload) return state

      const loading = state.fromText !== ''

      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading,
      }
    }
    case 'SET_TO_LANGUAGE': {
      if (state.toLanguage === action.payload) return state
      const loading = state.fromText !== ''

      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading,
      }
    }
    case 'SET_FROM_TEXT': {
      const loading = action.payload !== ''

      return {
        ...state,
        fromText: action.payload,
        loading,
        result: '',
      }
    }
    case 'SET_RESULT': {
      return {
        ...state,
        loading: false,
        result: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
