// @ts-check
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat()

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
  },
  eslintConfigPrettier,
  eslintPluginAstro.configs['jsx-a11y-strict'],
  {
    ignores: ['*', '!src/**'],
  },
  {
    rules: {
      'no-undef': 'off',
    },
  },
)
