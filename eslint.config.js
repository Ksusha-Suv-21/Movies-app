import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import airbnb from 'eslint-config-airbnb'
import babelParser from '@babel/eslint-parser'
import esImport from 'eslint-plugin-import'

export default [
  { ignores: ['dist'] },
  {
    languageOptions: {
      parser: babelParser
    }
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      prettier,
      jsxA11y,
      airbnb,
      esImport,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 0,
      'react/jsx-no-target-blank': 'off',
      'indent': ['error', 2],
      'linebreak-style': [0, 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
