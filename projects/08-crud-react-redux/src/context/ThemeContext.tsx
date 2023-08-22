import React, { ReactNode, createContext } from 'react'
import useTheme from '../hooks/useTheme'

type useThemeProps = ReturnType<typeof useTheme> | null

interface Props {
  children: ReactNode
}

export const ThemeContext = createContext<useThemeProps>(null)

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const { theme, setLightMode, setDarkMode, setDefaultSystemMode } = useTheme()

  return (
    <ThemeContext.Provider
      value={{ theme, setLightMode, setDarkMode, setDefaultSystemMode }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
