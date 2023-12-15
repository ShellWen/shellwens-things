import { useCallback, useMemo } from 'react'

import { useStore } from '@nanostores/react'

import { $localStorageTheme, $systemTheme, $theme, $useSystemTheme, type ThemeType } from './stores'

const useTheme = () => {
  const theme = useStore($theme)
  const systemTheme = useStore($systemTheme)
  const useSystemTheme = JSON.parse(useStore($useSystemTheme)) as boolean
  const localStorageTheme = useStore($localStorageTheme)
  const setUseSystemTheme = useCallback((value: boolean) => {
    $useSystemTheme.set(JSON.stringify(value))
  }, [])
  const setLocalStorageTheme = useCallback((value: ThemeType['name']) => {
    $localStorageTheme.set(value)
  }, [])
  return useMemo(
    () => ({
      theme,
      systemTheme,
      useSystemTheme,
      localStorageTheme,
      setUseSystemTheme,
      setLocalStorageTheme,
    }),
    [localStorageTheme, setLocalStorageTheme, setUseSystemTheme, systemTheme, theme, useSystemTheme],
  )
}

export default useTheme
