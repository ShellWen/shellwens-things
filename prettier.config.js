/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro', '@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  printWidth: 120,
  tabWidth: 2,
  endOfLine: 'lf',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^@test/(.*)$', '^[./]'],
  tailwindConfig: './tailwind.config.js',
}
