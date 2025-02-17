import { persistentAtom } from '@nanostores/persistent'
import { type ReadableAtom, atom, computed } from 'nanostores'

export interface ThemeType {
  name: string
  colorMode: 'light' | 'dark'
}

export const themes: Record<string, ThemeType> = {
  autumn: {
    name: 'autumn',
    colorMode: 'light',
  },
  dim: {
    name: 'dim',
    colorMode: 'dark',
  },
} as const

export const systemTheme = atom<'light' | 'dark' | 'unspecified'>('unspecified')
export const useSystemTheme = persistentAtom<string>('useSystemTheme', JSON.stringify(true))
export const localStorageTheme = persistentAtom<string>('theme', themes.dim.name)

const listener = (e: MediaQueryListEvent) => {
  systemTheme.set(e.matches ? 'light' : 'dark')
}

systemTheme.set(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', listener)

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', listener)
  })
}

export const theme: ReadableAtom<ThemeType> = computed(
  [systemTheme, useSystemTheme, localStorageTheme],
  (systemTheme, useSystemTheme, localStorageTheme) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const useSystemThemeBool = JSON.parse(useSystemTheme)
    if (useSystemThemeBool) {
      if (systemTheme === 'unspecified' || systemTheme === 'dark') {
        return themes.dim
      }
      return themes.autumn
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (themes[localStorageTheme] === undefined) {
      throw new Error(`Unknown local storage theme: ${localStorageTheme}`)
    }
    return themes[localStorageTheme]
  },
)
