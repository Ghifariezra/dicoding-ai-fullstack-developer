import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [react({
		fastRefresh: mode !== 'test',
	})],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.js',
	},
}))