import { useEffect, useState } from 'react'
import { Theme } from '../types'

// export type Theme = 'light' | 'dark' | 'system'

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system'
  })

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = () => {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    if (theme === 'dark') localStorage.theme = 'dark'
    else if (theme == 'light') localStorage.theme = 'light'
    else {
      localStorage.removeItem('theme')
      console.log('Setando darkModeMediaQuery listener')
      darkModeMediaQuery.addEventListener('change', handleThemeChange)
    }

    handleThemeChange()

    return () => {
      console.log('Limpiando darkModeMediaQuery listener')
      darkModeMediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [theme])

  const setDarkMode = () => setTheme('dark')
  const setLightMode = () => setTheme('light')
  const setDefaultSystemMode = () => setTheme('system')

  return { theme, setDarkMode, setLightMode, setDefaultSystemMode }
}
