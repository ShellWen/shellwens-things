import type { APIRoute } from 'astro'

// eslint-disable-next-line import/prefer-default-export
export const GET: APIRoute = async () => {
  try {
    await import('sharp')
  } catch (_e) {
    const e = _e as Error
    return Response.json(
      { error: 'import sharp failed', msg: e.message, stack: e.stack, name: e.name },
      { status: 500 },
    )
  }
  return Response.json({ success: 'import sharp succeeded' })
}
