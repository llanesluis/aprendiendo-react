import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE: UserWithId[] = [
  {
    id: '1',
    name: 'Luis Llanes',
    email: 'luiferllaboj@gmail.com',
    github: 'luiferllaboj',
  },
  {
    id: '2',
    name: 'Michelle Fierro',
    email: 'fierromichelle@gmail.com',
    github: 'hellokitty',
  },
  {
    id: '3',
    name: 'Manuela Bojorquez',
    email: 'aide7431@gmail.com',
    github: 'manuelitasayan',
  },
  {
    id: '4',
    name: 'Midudev',
    email: 'midudev@gmail.com',
    github: 'midudev',
  },
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

//Se utiliza una funcion que se invoca asi misma.
const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  return persistedState != null
    ? JSON.parse(persistedState).users
    : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      const newUser: UserWithId = {
        id,
        ...action.payload,
      }
      //REDUX TOOLKIT POR DEFECTO USA INTERNAMENTE IMMER, el estado puede mutarse.
      // return [...state, newUser]
      state.push(newUser)
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      // return state.filter((user) => user.id !== id)
      return state.filter((user) => user.id !== id)
    },
    editExistingUser: (state, action: PayloadAction<UserWithId>) => {
      const user = action.payload
      const { id } = user
      const indexEditingUser = state.findIndex((user) => user.id === id)

      state.splice(indexEditingUser, 1, user)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id
      )

      if (!isUserAlreadyDefined) {
        // return [...state, action.payload]
        state.push(action.payload)
      }
    },
  },
})

export default usersSlice.reducer
export const { deleteUserById, addNewUser, rollbackUser, editExistingUser } =
  usersSlice.actions
