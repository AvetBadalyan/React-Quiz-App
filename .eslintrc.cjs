module.exports = {
	root: true,
	env: { browser: true, es2021: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'prettier'
	],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: 'detect' } },
	plugins: ['react-refresh'],
	rules: {
		// Props are documented with JSDoc rather than the runtime prop-types
		// package, so this rule is intentionally disabled.
		'react/prop-types': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true }
		],
		'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
	},
	overrides: [
		{
			// Context files intentionally export a Provider component together
			// with their hook/constants, and ErrorBoundary ships its fallback
			// alongside it. That trips the Fast Refresh rule but is a deliberate,
			// idiomatic grouping, so we relax the rule for these files.
			files: ['src/context/**/*.jsx', 'src/components/ErrorBoundary.jsx'],
			rules: { 'react-refresh/only-export-components': 'off' }
		},
		{
			files: ['**/*.test.{js,jsx}', 'src/test/**'],
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
	]
}
