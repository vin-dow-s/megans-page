import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tailwind from 'eslint-plugin-tailwindcss'

const compat = new FlatCompat()

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            'react-hooks': hooksPlugin,
        },
        rules: hooksPlugin.configs.recommended.rules,
    },
    // Tailwind CSS linting
    ...tailwind.configs['flat/recommended'],
    // Next.js optimizations
    ...fixupConfigRules(compat.extends('plugin:@next/next/core-web-vitals')),
    {
        settings: {
            react: {
                version: '19.0',
            },
        },
        rules: {
            'react/react-in-jsx-scope': 0,
            'react/no-unescaped-entities': 0,
            'react/prop-types': 0,
            '@next/next/no-img-element': 0,
        },
    },
    // Ignored files
    {
        ignores: ['.next/', 'tailwind.config.ts', 'next.config.js', '*.js'],
    },
]
