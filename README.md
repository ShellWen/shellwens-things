# ShellWen's Things

这是我的个人主页网站源代码。基于 Astro 构建的静态站点生成器。

## 设计系统

全站已采用奶白与棕色的「轻一点，有点俏皮」设计，DaisyUI 已移除。首页、文章列表、正文、导航、搜索和页脚共用 `src/styles/global.css` 的色板与短语义类，例如 `class="button button-primary"`；重复结构由现有 Astro / Svelte 组件复用。

交互规范页：[`/design-system`](/design-system)；完整视觉规范与 [Tailwind v4 实现约定](docs/design-system.md#21-tailwind-v4-实现约定)见[设计系统文档](docs/design-system.md)。规范页使用同一全局样式入口，保留基础规范与组件交互演示，不再展示虚构文章的页面样例。

## 📝 许可证

- 源代码：[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)
- 文章内容：[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans)

## ⚠️ 注意事项

本项目目前不接受任何形式的外部贡献。
