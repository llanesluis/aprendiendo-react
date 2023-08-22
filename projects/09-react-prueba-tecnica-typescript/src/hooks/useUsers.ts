import { useEffect, useRef, useState } from 'react'
import { User } from '../types'

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const originalUsers = useRef<User[]>([])

  //Fetching the users from the API
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const deleteUser = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)

    if (!filteredUsers) return
    setUsers(filteredUsers)
  }

  const setOriginalUsers = () => {
    setUsers(originalUsers.current)
  }

  return { users, deleteUser, setOriginalUsers }
}
