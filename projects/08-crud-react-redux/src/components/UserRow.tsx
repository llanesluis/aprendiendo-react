import React from 'react'
import { UserWithId } from '../store/users/slice'
import { TableCell, TableRow } from '@tremor/react'
import { DeleteIcon, EditIcon } from './Icons'

interface Props {
  user: UserWithId
  deleteUser: () => void
}

const UserRow: React.FC<Props> = ({ user, deleteUser }) => {
  const { id, name, email, github } = user

  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell className='flex gap-2'>
        <img
          className='h-6 w-6 rounded-full'
          src={`https://unavatar.io/github/${github}`}
          alt={`Profile photo from ${github}`}
        />
        {github}
      </TableCell>
      <TableCell>{email}</TableCell>

      <TableCell className='flex gap-2 justify-end'>
        <button
          type='button'
          onClick={() => {}}
          className=' hover:text-blue-400'
          title='Editar'
        >
          <EditIcon />
        </button>

        <button
          type='button'
          onClick={deleteUser}
          className=' hover:text-red-400'
          title='Eliminar'
        >
          <DeleteIcon />
        </button>
      </TableCell>
    </TableRow>
  )
}

export default UserRow
