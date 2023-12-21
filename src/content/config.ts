import { defineCollection, reference, z } from 'astro:content'

const post = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
      // heroImage: z.string().optional(),
      // @ts-expect-error Astro's type definitions is wrong
      heroImage: image().optional().default('@assets/images/default_banner.png'),
      heroImageAlt: z.string().optional(),
      category: reference('category'),
    }),
})

const page = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
      // @ts-expect-error Astro's type definitions is wrong
      heroImage: image().optional().default('@assets/images/default_banner.png'),
      heroImageAlt: z.string().optional(),
    }),
})

const category = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    sortOrder: z.number(),
  }),
})

// eslint-disable-next-line import/prefer-default-export
export const collections = { post, page, category }
