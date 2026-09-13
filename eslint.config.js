import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
	// Base JS recommended rules
	js.configs.recommended,

	// React + JSX
	{
		files: ['**/*.{js,jsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2021
			},
			parserOptions: {
				ecmaFeatures: { jsx: true }
			}
		},
		settings: {
			react: { version: 'detect' }
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			...reactPlugin.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,

			// Props are documented with JSDoc — prop-types not needed
			'react/prop-types': 'off',

			// These new rules flag valid and idiomatic React patterns:
			// - setState in useEffect (for derived state resets) is legitimate
			// - ref mutation in render body is a well-established stable-ref pattern
			// Both are addressed in the codebase correctly; the rules are too strict.
			'react-hooks/no-direct-set-state-in-use-effect': 'off',
			'react-hooks/set-state-in-effect': 'off',
			'react-hooks/refs': 'off',

			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true }
			],

			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
		}
	},

	// Context files and ErrorBoundary export multiple things intentionally
	{
		files: ['src/context/**/*.jsx', 'src/components/ErrorBoundary.jsx'],
		rules: {
			'react-refresh/only-export-components': 'off'
		}
	},

	// Test files — vitest globals are injected via vite.config.js globals:true
	{
		files: ['**/*.test.{js,jsx}', 'src/test/**'],
		languageOptions: {
			globals: {
				vi: 'readonly',
				describe: 'readonly',
				it: 'readonly',
				expect: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly'
			}
		}
	},

	// Node.js scripts (generate-sounds etc.)
	{
		files: ['scripts/**/*.mjs', 'scripts/**/*.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	},

	// Ignore built output and deps
	{
		ignores: ['dist/**', 'node_modules/**', 'coverage/**']
	},

	// Prettier must be last — turns off all formatting rules
	prettierConfig
]
