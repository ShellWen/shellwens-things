// @ts-check
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
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
    ...reactPlugin.configs.flat.recommended,
    files: ['**/*.jsx', '**/*.tsx'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  reactPlugin.configs.flat['jsx-runtime'],
  ...compat.extends('plugin:react-hooks/recommended'),
  reactRefreshPlugin.configs.vite,
  {
    ignores: ['*', '!src/**'],
  },
  {
    rules: {
      'no-undef': 'off',
      'react/prop-types': 'off',
    },
  },
)
