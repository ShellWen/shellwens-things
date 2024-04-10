import React, { type PropsWithChildren, memo } from 'react'

import { MdArrowForward } from 'react-icons/md'

const Text: React.FC<PropsWithChildren<React.HTMLProps<HTMLDivElement>>> = memo(
  ({ children, className, ...divProps }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={`text-2xl ${className}`} {...divProps}>
      {children}
    </div>
  ),
)
const TextLarge: React.FC<PropsWithChildren<React.HTMLProps<HTMLDivElement>>> = memo(
  ({ children, className, ...divProps }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={`text-4xl ${className}`} {...divProps}>
      {children}
    </div>
  ),
)

const HomeIntro = () => {
  return (
    <main className="min-h-[80vh] px-8 py-8 font-serif">
      <article className="mx-auto max-w-4xl">
        <Text>你好，</Text>
        <TextLarge>
          我是<strong>颉文</strong>，
        </TextLarge>
        <Text>
          一位高中生，
          <br />
          也是一名全栈开发者。
        </Text>
        <br />
        <Text className="text-base italic">
          年少的激情在代码中迸发，
          <br />
          每一行都是心灵的畅想。
          <br />
          代码是我创意的画笔，
          <br />
          用二进制描绘未来的图谱。
        </Text>
        <br />
        <a href="/about">
          <MdArrowForward className="inline-block" />
          关于我
        </a>
      </article>
    </main>
  )
}

export default HomeIntro
