import { ListOfTodos, Todo } from '../types'

export const initialState =
  (JSON.parse(window.localStorage.getItem('todos')) as ListOfTodos) || []
export const updateLocalStorage = (state: ListOfTodos) => {
  window.localStorage.setItem('todos', JSON.stringify(state))
}

export const todoReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD_TODO': {
      if (!payload.title) return state
      const newTodo = {
        id: crypto.randomUUID(),
        title: payload.title,
        completed: false,
      }
      const newTodos = [...state, newTodo]

      updateLocalStorage(newTodos)
      return newTodos
    }
    case 'REMOVE_TODO': {
      const newTodos = state.filter((todo: Todo) => todo.id !== payload.id)
      return newTodos
    }
    case 'TOGGLE_TODO': {
      const newTodos = state.map((todo: Todo) => {
        return todo.id === payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      })

      updateLocalStorage(newTodos)
      return newTodos
    }
    // case 'FILTER_TODOS': {
    //   const filteredTodos = state.filter((todo: Todo) => {
    //     if (payload.filter === TODO_FILTERS.ACTIVE) return !todo.completed;
    //     if (payload.filter === TODO_FILTERS.COMPLETED) return todo.completed;
    //     return todo;
    //   });
    //   return filteredTodos;
    // }
    case 'CLEAR_COMPLETED_TODOS': {
      const newTodos = state.filter((todo: Todo) => !todo.completed)

      updateLocalStorage(newTodos)
      return newTodos
    }
    default: {
      return state
    }
  }
}
