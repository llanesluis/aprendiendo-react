import { Toaster } from 'sonner'
import FormUser from './components/FormUser'
import ListOfUsers from './components/ListOfUsers'
import { useAppSelector } from './hooks/store'
import Theme from './components/Theme'
import useThemeConfig from './hooks/useThemeConfig'

function App() {
  //TODO: Agregar funcionalidad para editar
  const users = useAppSelector((state) => state.users)
  const { theme } = useThemeConfig()

  return (
    <>
      <Theme />
      <FormUser />
      <ListOfUsers users={users} />
      <Toaster theme={theme} richColors />
    </>
  )
}

export default App
