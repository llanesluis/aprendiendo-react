import React, { useMemo } from 'react'
import { DarkModeIcon, LightModeIcon, SystemIcon } from './Icons'
import useTheme from '../hooks/useTheme'

interface Props {}

const Theme: React.FC<Props> = () => {
  const { theme, setLightMode, setDarkMode, setDefaultSystemMode } = useTheme()

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
    <div className='flex gap-2 left-0 top-5 fixed bg-slate-100 text-black/70 dark:bg-slate-950 dark:text-white/70 pr-4 p-2 shadow-md rounded-br-full rounded-tr-full'>
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
