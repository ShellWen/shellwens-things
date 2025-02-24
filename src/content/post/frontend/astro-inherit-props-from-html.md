---
title: 'Astro 组件中如何从 HTML 原生元素继承 Props 类型'
description: '了解在 Astro 框架中，如何通过继承原生 HTML 元素的 Props 类型，使自定义组件能够使用原生 HTML 元素的属性。文章涵盖了问题背景、在 React 中的解决方案以及在 Astro 中的实现方法。'
pubDate: '2023-12-22'
updatedDate: '2025-02-13'
heroImage: './astro-inherit-props-from-html.png'
category: frontend
# tags: astro, typescript
---

> 2025-02-13 更新：
>
> 在最新的 Astro 5.2.0 版本中，你不必再使用 `astroHTML.JSX`。你可以直接使用 `import type { HTMLAttributes } from 'astro/types'` 并使用类似于 `HTMLAttributes['div']` 的方式来继承原生 HTML 元素的 Props 类型。
>
> 参见：[TypeScript | Docs #Built-in HTML attributes](https://docs.astro.build/en/guides/typescript/#built-in-html-attributes)
>
> 以下内容仍然适用于较旧的 Astro 版本，仅适用于存档目的。

# 为什么要继承原生 HTML 元素的 Props 类型？

现代前端框架中，我们经常会使用 JSX 语法来编写组件，而在 JSX 中，我们可以使用原生 HTML 元素，比如 `<div>`、`<span>` 等。\
同样地，我们可以编写自定义组件，封装原生的 HTML 元素，比如我们可以编写一个 `<FormattedDate>` 组件，用来格式化日期。\
`FormattedDate.astro`:

```astro
---
interface Props {
  date: Date
}

const { date } = Astro.props
---

<time datetime={date.toISOString()}>
  {
    date.toLocaleDateString('zh-Hans-CN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }
</time>
```

这样我们就可以在代码中使用 `FormattedDate` 组件了：

```astro
<FormattedDate date={new Date()} />
```

但是这么做会有一个问题，就是我们无法在 `FormattedDate` 组件中使用原生 `time` 元素的 Props，比如 `class`。\
我们无法将任何 `time` 的原生属性传递给 `FormattedDate` 组件，意味着我们无法在 `FormattedDate` 组件中使用 `class`、`style` 等属性。

# 在 React 的世界中

在 React 的世界中，我们可以使用诸如 `React.HTMLProps<HTMLDivElement>` 等魔法继承原生 HTML 元素的 Props 类型。我们可以定义一个接口，继承 `React.HTMLProps<HTMLDivElement>`，然后在组件中使用这个接口作为 Props 的类型，这样我们就可以在组件中使用原生 HTML 元素的 Props 了。

```tsx
interface Props extends React.HTMLProps<HTMLDivElement> {
  foo: string
  bar: number
  baz: boolean
}

const Component: React.FC<Props> = (foo, bar, baz, ...restProps) => {
  return <div {...restProps}></div>
}
```

# Astro 呢？

Astro 定义了一系列 `.d.ts`，在 `astro/astro.jsx.d.ts` 中，他们定义了一个名为 `astroHTML.JSX` 的命名空间，其中就有我们需要的 HTML 元素的 Props 类型。我们可以使用诸如 `astroHTML.JSX.DivHTMLAttributes` 的 interface 来继承原生 HTML 元素的 Props 类型。\
`FormattedDate.astro`:

```astro
---
interface Props extends Omit<astroHTML.JSX.TimeHTMLAttributes, 'datetime'> {
  date: Date
}

const { date, ...timeProps } = Astro.props
---

<time datetime={date.toISOString()} {...timeProps}>
  {
    date.toLocaleDateString('zh-Hans-CN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }
</time>
```

这样我们就可以在 `FormattedDate` 组件中使用原生 `time` 元素的 Props 了：

```astro
<FormattedDate date={new Date()} class="text-red-500" />
```
