/**
 * useLocalStorage Hook
 *
 * Generic hook for syncing React state with localStorage.
 * Handles JSON serialization/deserialization and provides
 * a useState-like API with automatic persistence.
 *
 * Validates: Requirements 8.8, 10.2
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for syncing state with localStorage
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value if key doesn't exist
 * @returns {[*, Function]} - [value, setValue] tuple
 *
 * @example
 * // Boolean preference
 * const [soundEnabled, setSoundEnabled] = useLocalStorage('soundEnabled', false)
 *
 * @example
 * // Object storage
 * const [preferences, setPreferences] = useLocalStorage('prefs', { theme: 'dark' })
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      // Parse stored JSON or return initialValue if nothing stored
      return item !== null ? JSON.parse(item) : initialValue
    } catch (error) {
      // If parsing fails, return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * Wrapped setter that updates both state and localStorage
   * Accepts a value or a function (like useState's setter)
   *
   * @param {*|Function} valueOrFn - New value or function that receives previous value
   */
  const setValue = useCallback(
    (valueOrFn) => {
      try {
        // Allow value to be a function (like useState)
        const valueToStore =
          valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn

        // Update React state
        setStoredValue(valueToStore)

        // Save to localStorage with JSON serialization
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue))
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error)
        }
      } else if (event.key === key && event.newValue === null) {
        // Key was removed, reset to initial value
        setStoredValue(initialValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue]
}
