import { type Locale, defaultLocale, locales } from './constants'

const foldLocale = (locale: string | undefined, msgs: Record<Locale, string>): string => {
  if (!locale || !locales.includes(locale as Locale)) {
    return msgs[defaultLocale]
  }
  return msgs[locale as Locale]
}

export default foldLocale
