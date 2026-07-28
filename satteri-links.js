import GithubSlugger from 'github-slugger'

export const satteriContentLinks = {
  name: 'content-links',
  element: [
    {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      visit(node, ctx) {
        const slugger = (ctx.data.headingSlugger ??= new GithubSlugger())
        const id = typeof node.properties.id === 'string' ? node.properties.id : slugger.slug(ctx.textContent(node))
        ctx.setProperty(node, 'id', id)
        ctx.prependChild(node, {
          type: 'element',
          tagName: 'a',
          properties: { ariaHidden: 'true', tabIndex: -1, href: `#${id}` },
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['icon', 'icon-link'] },
              children: [],
            },
          ],
        })
      },
    },
    {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties.href
        if (typeof href !== 'string' || (!/^https?:/i.test(href) && !href.startsWith('//'))) return
        ctx.setProperty(node, 'rel', ['noopener', 'noreferrer', 'nofollow'])
        ctx.setProperty(node, 'target', '_blank')
      },
    },
  ],
}
