import React, { useMemo } from 'react'
import { DarkModeIcon, LightModeIcon, SystemIcon } from './Icons'
import useThemeConfig from '../hooks/useThemeConfig'

interface Props {}

const Theme: React.FC<Props> = () => {
  const { theme, setLightMode, setDarkMode, setDefaultSystemMode } = useThemeConfig()

  const options = useMemo(
    () => [
      {
        type: 'light',
        Component: <LightModeIcon />,
        onClick: setLightMode,
      },
      {
        type: 'dark',
        Component: <DarkModeIcon />,
        onClick: setDarkMode,
      },
      {
        type: 'system',
        Component: <SystemIcon />,
        onClick: setDefaultSystemMode,
      },
    ],
    [setLightMode, setDarkMode, setDefaultSystemMode]
  )

  return (
    <div className='group flex gap-6 absolute left-0 bottom-20 bg-gray-100 text-black/70 dark:bg-gray-950 dark:text-white/70 pr-6 p-4 shadow-md rounded-br-full rounded-tr-full'>
      {options.map((mode) => (
        <button
          key={mode.type}
          className={`hover:text-blue-800 dark:hover:text-blue-300 hover:scale-110 transition ${
            theme === mode.type && 'text-blue-500 dark:text-blue-700'
          }`}
          onClick={mode.onClick}
        >
          {mode.Component}
        </button>
      ))}
    </div>
  )
}

export default Theme
