import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('My app works as expected', async () => {
  //Simulamos un usuario
  const user = userEvent.setup()

  //Simulamos un renderizado de APP
  const app = render(<App />)

  //Obtenemos el elemento donde escribe el usuario 'fromText'
  const textAreaFrom = app.getByPlaceholderText('Introduzca el texto...')

  //Simulamos que el usuario escribe en el elemento
  await user.type(textAreaFrom, 'Hola mundo')

  //Busca si en "la pantalla" se muestra algun patron "/Hello world/i"
  const result = await app.findByDisplayValue(
    /Hello world/i,
    {},
    { timeout: 5000 }
  )

  //Espera que sea verdadero
  expect(result).toBeTruthy()
})
