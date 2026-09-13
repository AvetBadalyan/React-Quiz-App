/**
 * Property-based tests for the shuffle utility
 *
 * **Validates: Requirements 2.5** (answer shuffling)
 *
 * These tests verify that the Fisher-Yates shuffle implementation preserves
 * all elements while randomizing their order, using fast-check to test
 * across a wide range of inputs.
 */
import fc from 'fast-check'
import { describe, it } from 'vitest'
import { shuffle } from './shuffle.js'

describe('shuffle property tests', () => {
	/**
	 * Property: Shuffle preserves all elements
	 * **Validates: Requirements 2.5**
	 *
	 * This property ensures that the shuffle function:
	 * 1. Returns an array of the same length as the input
	 * 2. Contains exactly the same elements (same values, same counts)
	 * 3. Does not mutate the original array
	 * 4. Works for arrays of any type and size
	 */
	it('should preserve all elements after shuffling (length property)', () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), arr => {
				const shuffled = shuffle(arr)

				// Property 1: Shuffled array has the same length as input
				return shuffled.length === arr.length
			})
		)
	})

	it('should preserve all elements after shuffling (element preservation)', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), arr => {
				const shuffled = shuffle(arr)

				// Property 2: Shuffled array contains all elements from input
				// Sort both arrays to compare element counts
				const sortedOriginal = [...arr].sort((a, b) => a - b)
				const sortedShuffled = [...shuffled].sort((a, b) => a - b)

				return JSON.stringify(sortedOriginal) === JSON.stringify(sortedShuffled)
			})
		)
	})

	it('should preserve all elements including duplicates', () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: 1, max: 10 }), {
					minLength: 0,
					maxLength: 50
				}),
				arr => {
					const shuffled = shuffle(arr)

					// Count occurrences of each element
					const countOccurrences = array => {
						const counts = new Map()
						for (const item of array) {
							counts.set(item, (counts.get(item) || 0) + 1)
						}
						return counts
					}

					const originalCounts = countOccurrences(arr)
					const shuffledCounts = countOccurrences(shuffled)

					// Check that both maps have the same size
					if (originalCounts.size !== shuffledCounts.size) {
						return false
					}

					// Check that each element has the same count
					for (const [key, count] of originalCounts) {
						if (shuffledCounts.get(key) !== count) {
							return false
						}
					}

					return true
				}
			)
		)
	})

	it('should not mutate the original array', () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), arr => {
				// Create a deep copy of the original for comparison
				const originalCopy = JSON.parse(JSON.stringify(arr))

				shuffle(arr)

				// Property 3: Original array is unchanged after shuffle
				return JSON.stringify(arr) === JSON.stringify(originalCopy)
			})
		)
	})

	it('should work with arrays of strings', () => {
		fc.assert(
			fc.property(fc.array(fc.string()), arr => {
				const shuffled = shuffle(arr)

				// Verify length preservation
				if (shuffled.length !== arr.length) {
					return false
				}

				// Verify all strings are present
				const sortedOriginal = [...arr].sort()
				const sortedShuffled = [...shuffled].sort()

				return JSON.stringify(sortedOriginal) === JSON.stringify(sortedShuffled)
			})
		)
	})

	it('should work with arrays of objects', () => {
		const objectArbitrary = fc.record({
			id: fc.integer(),
			text: fc.string(),
			value: fc.boolean()
		})

		fc.assert(
			fc.property(fc.array(objectArbitrary), arr => {
				const shuffled = shuffle(arr)

				// Verify length preservation
				if (shuffled.length !== arr.length) {
					return false
				}

				// Verify all objects are present by counting stringified representations
				const countObjects = array => {
					const counts = new Map()
					for (const obj of array) {
						const key = JSON.stringify(obj)
						counts.set(key, (counts.get(key) || 0) + 1)
					}
					return counts
				}

				const originalCounts = countObjects(arr)
				const shuffledCounts = countObjects(shuffled)

				// Check that both maps have the same size
				if (originalCounts.size !== shuffledCounts.size) {
					return false
				}

				// Check that each object has the same count
				for (const [key, count] of originalCounts) {
					if (shuffledCounts.get(key) !== count) {
						return false
					}
				}

				return true
			})
		)
	})

	it('should return empty array for empty input', () => {
		fc.assert(
			fc.property(fc.constant([]), arr => {
				const shuffled = shuffle(arr)
				return shuffled.length === 0 && Array.isArray(shuffled)
			})
		)
	})

	it('should return single element array unchanged (in value)', () => {
		fc.assert(
			fc.property(fc.anything(), item => {
				const arr = [item]
				const shuffled = shuffle(arr)

				// Single element array should have length 1 and same element
				return shuffled.length === 1 && Object.is(shuffled[0], item)
			})
		)
	})

	it('should handle mixed type arrays', () => {
		const mixedArbitrary = fc.oneof(
			fc.integer(),
			fc.string(),
			fc.boolean(),
			fc.constant(null),
			fc.constant(undefined)
		)

		fc.assert(
			fc.property(fc.array(mixedArbitrary), arr => {
				const shuffled = shuffle(arr)

				// Verify length
				if (shuffled.length !== arr.length) {
					return false
				}

				// For mixed types, just verify each original element exists in shuffled
				// Count null and undefined separately since they need special handling
				const countNull = array => array.filter(x => x === null).length
				const countUndefined = array =>
					array.filter(x => x === undefined).length
				const countOthers = array => {
					const counts = new Map()
					for (const item of array) {
						if (item !== null && item !== undefined) {
							const key = JSON.stringify(item)
							counts.set(key, (counts.get(key) || 0) + 1)
						}
					}
					return counts
				}

				if (countNull(arr) !== countNull(shuffled)) return false
				if (countUndefined(arr) !== countUndefined(shuffled)) return false

				const originalCounts = countOthers(arr)
				const shuffledCounts = countOthers(shuffled)

				if (originalCounts.size !== shuffledCounts.size) return false

				for (const [key, count] of originalCounts) {
					if (shuffledCounts.get(key) !== count) return false
				}

				return true
			})
		)
	})
})
