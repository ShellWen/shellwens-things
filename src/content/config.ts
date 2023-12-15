import { defineCollection, reference, z } from 'astro:content'

const post = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: reference('category'),
  }),
})

const page = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
})

const category = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
})

// eslint-disable-next-line import/prefer-default-export
export const collections = { post, page, category }
