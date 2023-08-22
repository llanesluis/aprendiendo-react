import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function useThemeConfig() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw Error('useThemeConfig debe ser usado dentro de ThemeProvider')
  }
  return context
}
