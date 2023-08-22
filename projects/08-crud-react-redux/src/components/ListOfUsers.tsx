import {
  Card,
  Table,
  TableRow,
  TableHead,
  TableHeaderCell,
  TableBody,
  Title,
  Badge,
} from '@tremor/react'
import useUsersActions from '../hooks/useUsersActions'
import UserRow from './UserRow'
import { UserWithId } from '../store/users/slice'

interface Props {
  users: UserWithId[]
}
export const ListOfUsers: React.FC<Props> = ({ users }) => {
  const { deleteUser } = useUsersActions()

  return (
    <Card>
      <Title className='flex gap-2'>
        Usuarios<Badge>{users.length}</Badge>
      </Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Github</TableHeaderCell>
            <TableHeaderCell>E-mail</TableHeaderCell>
            <TableHeaderCell className='text-right'>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((item) => (
            <UserRow
              key={item.id}
              user={item}
              deleteUser={() => deleteUser(item.id)}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default ListOfUsers
