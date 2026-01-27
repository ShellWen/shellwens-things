---
title: 'Astro 添加预计阅读时间实践'
description: '为你的 Astro 博客添加阅读时间估算。本文将分享我在实现这个功能时的思路和代码，手把手带你搞定它。'
pubDate: '2025-02-21'
updatedDate: '2025-02-25'
category: frontend
# tags: astro, typescript
---

不知道你有没有在别的 Blog 中看到过类似「预计阅读时间：3 分钟」这样的提示？这种功能在很多博客平台上都很常见，它可以帮助读者快速评估阅读一篇文章所需的时间，进而帮助读者更好地安排时间。

在本文中，我们将从最基础的需求出发，一步步在 Astro 中完成这个功能的开发，相信你能从中获得一些启发。

# 需求分析

首先我们整理一下我们要实现什么功能：首先我们要提取文章中所有文字内容，然后根据文字内容的长度，计算出一个预计阅读时间。最后我们要将这个预计阅读时间展示在页面上。

# 动手实现

Astro 的 Markdown 处理底层使用了 [remark](https://www.npmjs.com/package/remark)，所以我们当然可以自定义一个 remark 插件[^1]来分析文章内容。

[mdast-util-to-string](https://www.npmjs.com/package/mdast-util-to-string) 可用于从 Markdown AST（mdast）中提取纯文本的文章内容，而我们还可以使用 [reading-time-estimator](https://www.npmjs.com/package/reading-time-estimator) 来计算预计阅读时间。

在项目根目录下新建以下文件：

```javascript
// remark-reading-time.js
import { toString } from 'mdast-util-to-string'
import { readingTime } from 'reading-time-estimator'

/** @import { RemarkPlugin } from '@astrojs/markdown-remark' */
/** @type {RemarkPlugin} */
export const remarkReadingTime = () => {
  return (tree, { data }) => {
    const textOnPage = toString(tree)
    const t = readingTime(textOnPage, 300, 'cn')
    data.astro.frontmatter.minutesRead = '预计 ' + t.text
  }
}
```

同时修改 Astro 的配置文件，添加我们自定义的这个 remark 插件：

```javascript
// astro.config.js
import { defineConfig } from 'astro/config'

import { remarkReadingTime } from './remark-reading-time.js'

export default defineConfig({
  // ...
  markdown: {
    // ...
    remarkPlugins: [/* ..., */ remarkReadingTime],
    // ...
  },
  // ...
})
```

这样，我们就可以对每篇文章的 frontmatter 添加一个 `minutesRead` 字段，用于存储预计阅读时间。

同时，我们需要在 Astro 的页面组件中，通过渲染对应 Content 的方式，同时“渲染”出存放在 frontmatter 中的 `minutesRead` 字段。

具体的代码实现参考如下：

```astro
---
// src/pages/[slug].astro
import { type CollectionEntry, getCollection, render } from 'astro:content'
import BlogPage from '@/layouts/Page.astro'

export async function getStaticPaths() {
  const pages = await getCollection('page')
  return pages.map((page) => ({
    params: { slug: page.id },
    props: page,
  }))
}
type Props = CollectionEntry<'page'>

const page = Astro.props
const { Content, headings, remarkPluginFrontmatter } = await render(page)
// 重点在于这里，minutesRead 就是我们通过 remark 插件添加的表示预计阅读时间的字段
const minutesRead = (remarkPluginFrontmatter.minutesRead as string | undefined) ?? ''
---

<BlogPage slug={page.id} {headings} {minutesRead} {...page.data}>
  <Content />
</BlogPage>
```

完整代码可参考 [:sparkles: add reading time gadget · ShellWen/shellwens-things@4fdda0d](https://github.com/ShellWen/shellwens-things/commit/4fdda0d6bfdc9e44b4a1480659df3c52f4cab81f)。

[^1]: 创建插件参考 [Create a remark plugin - unified](https://unifiedjs.com/learn/guide/create-a-remark-plugin/)
