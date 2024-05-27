import type { APIRoute } from 'astro'

// eslint-disable-next-line import/prefer-default-export
export const GET: APIRoute = async () => {
  try {
    await import('sharp')
  } catch (e) {
    return Response.json({ error: 'import sharp failed', msg: e }, { status: 500 })
  }
  return Response.json({ success: 'import sharp succeeded' })
}
