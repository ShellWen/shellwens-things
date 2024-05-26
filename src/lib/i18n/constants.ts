// If you add new locale here, you should also add it to astro config.
export const locales = ['en', 'zh-hans'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export type LocaleMessages = {
  [key in Locale]: Record<string, string>
}

