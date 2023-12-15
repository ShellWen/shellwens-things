import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    include: ['**/*.test.tsx'],
    includeSource: ['src/**/*.{js,ts,jsx,tsx,astro}'],
  },
})
