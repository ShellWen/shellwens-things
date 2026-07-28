import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri'
import { describe, expect, it } from 'vitest'

import { satteriContentLinks } from '../satteri-links.js'
import { getReadingTime } from '../src/lib/reading-time'

describe('Sätteri content rendering', () => {
  it('preserves reading time, heading links, and external link attributes', async () => {
    expect(getReadingTime()).toBe('预计 小于一分钟')

    const renderer = await createSatteriMarkdownProcessor({ hastPlugins: [satteriContentLinks] })
    const result = await renderer.render('# Hello World\n\n[Example](https://example.com)')

    expect(result.code).toContain(
      '<h1 id="hello-world"><a aria-hidden="true" tabindex="-1" href="#hello-world"><span class="icon icon-link"></span></a>Hello World</h1>',
    )
    expect(result.code).toContain(
      '<a href="https://example.com" rel="noopener noreferrer nofollow" target="_blank">Example</a>',
    )
    expect(result.metadata.headings).toEqual([{ depth: 1, slug: 'hello-world', text: 'Hello World' }])
  })
})
