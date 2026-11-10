import handler from '@astrojs/cloudflare/entrypoints/server'
import * as Sentry from '@sentry/cloudflare'

declare const __SENTRY_RELEASE__: string
declare const __SENTRY_DSN__: string | undefined

export default Sentry.withSentry(
  () => ({
    dsn: __SENTRY_DSN__,
    release: __SENTRY_RELEASE__,
  }),
  handler,
)
