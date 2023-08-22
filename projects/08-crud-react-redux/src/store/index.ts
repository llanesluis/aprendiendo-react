import { configureStore, Middleware } from '@reduxjs/toolkit'
import usersReducer from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    //fase 1, estado actual
    next(action)
    //fase 2, estado nuevo
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  }

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action

    //fase 1, estado actual
    console.log('PrevState: ', { action, state: store.getState() })
    next(action)

    //fase 2, estado nuevo
    console.log('NewState: ', { action, state: store.getState() })
    if (type === 'users/deleteUserById') {
      const deletedUserId = payload
      //Se sincroniza a la DB para borrar el registro

      toast.success(`Usuario ${deletedUserId} eliminado.`)
    }
    if (type === 'users/addNewUser') {
      //Se sincroniza a la DB para agregar el registro

      const newUser = payload
      const { name } = newUser

      toast.success(`Usuario "${name}" agregado.`)
    }
  }

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
