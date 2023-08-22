import { useAppDispatch } from './store'
import {
  deleteUserById,
  addNewUser,
  UserId,
  User,
  editExistingUser,
  UserWithId,
} from '../store/users/slice'

export default function useUsersActions() {
  const dispatch = useAppDispatch()

  const deleteUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const editUser = (user: UserWithId) => {
    dispatch(editExistingUser(user))
  }
  return { deleteUser, addUser, editUser }
}
