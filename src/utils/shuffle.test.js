import { describe, it, expect } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
	it('should return a new array with the same elements', () => {
		const original = [1, 2, 3, 4, 5]
		const shuffled = shuffle(original)

		// Should have the same length
		expect(shuffled).toHaveLength(original.length)

		// Should contain all original elements
		expect(shuffled.sort()).toEqual(original.sort())
	})

	it('should not mutate the original array', () => {
		const original = [1, 2, 3, 4, 5]
		const originalCopy = [...original]

		shuffle(original)

		expect(original).toEqual(originalCopy)
	})

	it('should return an empty array when given an empty array', () => {
		const result = shuffle([])
		expect(result).toEqual([])
	})

	it('should return a single-element array unchanged', () => {
		const result = shuffle([42])
		expect(result).toEqual([42])
	})

	it('should handle arrays with duplicate values', () => {
		const original = [1, 1, 2, 2, 3]
		const shuffled = shuffle(original)

		expect(shuffled).toHaveLength(original.length)
		expect(shuffled.sort()).toEqual(original.sort())
	})

	it('should handle arrays with mixed types', () => {
		const original = [1, 'two', { three: 3 }, null, undefined]
		const shuffled = shuffle(original)

		expect(shuffled).toHaveLength(original.length)

		// Verify all original elements are present
		original.forEach(item => {
			expect(shuffled).toContain(item)
		})
	})
})
