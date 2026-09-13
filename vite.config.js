import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Merge Vite and Vitest configs cleanly in Vitest 5+
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.js'],
		include: ['src/**/*.{test,spec}.{js,jsx}'],
		// Vitest 5 changed clearMocks default to true which would break tests
		// that rely on mock call counts accumulating across tests.
		// We keep the Vitest 1–4 behaviour (false) for now.
		clearMocks: false,
		coverage: {
			reporter: ['text', 'json', 'html']
		}
	}
})
