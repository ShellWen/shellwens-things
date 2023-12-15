/**
 * Tailwind CSS and DaisyUI Configuration
 * @typedef {import('tailwindcss').Config} TailwindConfig
 * @typedef {import('daisyui').Config} DaisyUIConfig
 * @typedef {import('@tailwindcss/typography')} TailwindTypographyPlugin
 */
import tailwindcssAspectRatio from '@tailwindcss/aspect-ratio';
import tailwindcssTypography from '@tailwindcss/typography';
import daisyUi from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';


/**
 * DaisyUI Configuration
 * @type {DaisyUIConfig}
 */
const daisyUiConfig = {
  themes: ['dim', 'autumn'],
  darkTheme: 'dim'
}

/**
 * Tailwind CSS Configuration
 * @type {TailwindConfig}
 */
const config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        body: [...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindcssAspectRatio, tailwindcssTypography, daisyUi],
  daisyui: daisyUiConfig,
}

export default config