import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

const generateIdIgnorePath = ({ entry, data }: { entry: string; base: URL; data: Record<string, unknown> }) => {
  if (data.slug) {
    return data.slug as string
  }
  const regex = /[^/\\]*(?=\.[^.]*$)|[^/\\]*$/
  const slug = entry.match(regex)?.[0]
  if (!slug) throw new Error(`Failed to generate ID for ${entry}`)
  return slug
}

const post = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/post', generateId: generateIdIgnorePath }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.iso.date(),
    updatedDate: z.iso.date(),
    category: reference('category'),
  }),
})

const page = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/page',
    generateId: generateIdIgnorePath,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.iso.date(),
    updatedDate: z.iso.date(),
  }),
})

const category = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/category' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    sortOrder: z.number(),
  }),
})

export const collections = { post, page, category }
