import type { APIRoute } from 'astro'

import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts'
import { postsRssApi } from '@/lib/rss'

export const GET: APIRoute = postsRssApi(() => true, SITE_TITLE, SITE_DESCRIPTION)
