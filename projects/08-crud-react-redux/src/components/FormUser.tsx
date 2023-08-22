import { Button, Card, TextInput, Title } from '@tremor/react'
import useUsersActions from '../hooks/useUsersActions'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface Props {}

const FormUser: React.FC<Props> = () => {
  const [, setResult] = useState<'ok' | 'ko' | null>(null)
  const { addUser } = useUsersActions()

  const handleSaveChanges = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    if (!formData) return

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      toast.error('Campos incompletos.')
      return setResult('ko')
    }

    addUser({ name, email, github })

    setResult('ok')
    form.reset()
  }

  return (
    <Card className='mb-4 flex flex-col gap-2'>
      <Title>Crear un nuevo usuario</Title>
      <form className='flex flex-col gap-2' onSubmit={handleSaveChanges}>
        <TextInput placeholder='Nombre' name='name' />
        <TextInput type='email' placeholder='E-mail' name='email' />
        <TextInput placeholder='Usuario de Github' name='github' />
        <Button type='submit'>Guardar cambios</Button>
      </form>
    </Card>
  )
}

export default FormUser
