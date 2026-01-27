import { glob } from 'astro/loaders'
import { defineCollection, reference, z } from 'astro:content'

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
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
      category: reference('category'),
    }),
})

const page = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/page',
    generateId: generateIdIgnorePath,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
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
