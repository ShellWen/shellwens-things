import * as Sentry from '@sentry/astro'

declare const __SENTRY_RELEASE__: string
declare const __SENTRY_DSN__: string | undefined

Sentry.init({
  dsn: __SENTRY_DSN__,
  release: __SENTRY_RELEASE__,
})
