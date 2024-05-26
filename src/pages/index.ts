import type { APIRoute } from 'astro'

import { defaultLocale } from '@/lib/i18n/constants'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const req = context.request
  const locale = context.preferredLocale ?? defaultLocale
  const url = new URL(req.url)
  const path = url.pathname
  const redirectUrl = `/${locale}${path}`
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
    },
  })
}
