import { useCallback, useState } from 'react'

/**
 * Generic hook for syncing React state with localStorage.
 * Provides a useState-like API with automatic JSON serialization.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value when the key doesn't exist yet
 * @returns {[*, Function]} [storedValue, setValue]
 *
 * @example
 * const [muted, setMuted] = useLocalStorage('soundEnabled', false)
 */
export function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key)
			return item !== null ? JSON.parse(item) : initialValue
		} catch {
			return initialValue
		}
	})

	const setValue = useCallback(
		valueOrFn => {
			try {
				const next =
					valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn
				setStoredValue(next)
				localStorage.setItem(key, JSON.stringify(next))
			} catch (error) {
				console.warn(`useLocalStorage: could not write key "${key}"`, error)
			}
		},
		[key, storedValue]
	)

	return [storedValue, setValue]
}
