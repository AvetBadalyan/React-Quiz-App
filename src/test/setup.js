/**
 * Test setup file for Vitest
 * Configures the testing environment with necessary polyfills and mocks
 */

import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup()
})

// Mock matchMedia for components that use responsive design
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => {}
	})
})

// Mock ResizeObserver for components that observe element size changes
function createResizeObserver() {
	return {
		observe: () => {},
		unobserve: () => {},
		disconnect: () => {}
	}
}
global.ResizeObserver = function () {
	return createResizeObserver()
}

// Mock Audio for sound-related tests
function createMockAudio() {
	const audio = {
		preload: '',
		volume: 1,
		currentTime: 0,
		load: () => Promise.resolve(),
		play: () => Promise.resolve(),
		pause: () => {},
		cloneNode: () => createMockAudio(),
		addEventListener: () => {},
		removeEventListener: () => {}
	}
	return audio
}
global.Audio = function () {
	return createMockAudio()
}
