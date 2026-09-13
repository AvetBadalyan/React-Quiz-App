import { describe, it, expect } from 'vitest'
import { calculateScore, calculatePercentages } from './scoring'

describe('scoring utilities', () => {
	describe('calculateScore', () => {
		it('should calculate score as percentage', () => {
			expect(calculateScore(8, 10)).toBe(80)
			expect(calculateScore(15, 20)).toBe(75)
			expect(calculateScore(10, 10)).toBe(100)
		})

		it('should return 0 for zero correct answers', () => {
			expect(calculateScore(0, 10)).toBe(0)
		})

		it('should return 0 for zero total questions', () => {
			expect(calculateScore(5, 0)).toBe(0)
		})

		it('should return 0 for negative total', () => {
			expect(calculateScore(5, -1)).toBe(0)
		})

		it('should return 0 for negative correct', () => {
			expect(calculateScore(-1, 10)).toBe(0)
		})

		it('should cap at 100 if correct exceeds total', () => {
			expect(calculateScore(15, 10)).toBe(100)
		})

		it('should round to nearest integer', () => {
			expect(calculateScore(1, 3)).toBe(33)
			expect(calculateScore(2, 3)).toBe(67)
		})
	})

	describe('calculatePercentages', () => {
		it('should calculate correct, wrong, and skipped percentages', () => {
			const result = calculatePercentages({ correct: 6, wrong: 3, skipped: 1 })
			expect(result.correct).toBe(60)
			expect(result.wrong).toBe(30)
			expect(result.skipped).toBe(10)
		})

		it('should handle all correct answers', () => {
			const result = calculatePercentages({ correct: 10, wrong: 0, skipped: 0 })
			expect(result.correct).toBe(100)
			expect(result.wrong).toBe(0)
			expect(result.skipped).toBe(0)
		})

		it('should handle all wrong answers', () => {
			const result = calculatePercentages({ correct: 0, wrong: 10, skipped: 0 })
			expect(result.correct).toBe(0)
			expect(result.wrong).toBe(100)
			expect(result.skipped).toBe(0)
		})

		it('should handle all skipped questions', () => {
			const result = calculatePercentages({ correct: 0, wrong: 0, skipped: 10 })
			expect(result.correct).toBe(0)
			expect(result.wrong).toBe(0)
			expect(result.skipped).toBe(100)
		})

		it('should return all zeros for empty results', () => {
			const result = calculatePercentages({ correct: 0, wrong: 0, skipped: 0 })
			expect(result.correct).toBe(0)
			expect(result.wrong).toBe(0)
			expect(result.skipped).toBe(0)
		})

		it('should handle null/undefined results', () => {
			expect(calculatePercentages(null)).toEqual({ correct: 0, wrong: 0, skipped: 0 })
			expect(calculatePercentages(undefined)).toEqual({ correct: 0, wrong: 0, skipped: 0 })
		})

		it('should handle missing properties with defaults', () => {
			const result = calculatePercentages({ correct: 5 })
			expect(result.correct).toBe(100)
			expect(result.wrong).toBe(0)
			expect(result.skipped).toBe(0)
		})

		it('should round percentages to nearest integer', () => {
			const result = calculatePercentages({ correct: 1, wrong: 1, skipped: 1 })
			expect(result.correct).toBe(33)
			expect(result.wrong).toBe(33)
			expect(result.skipped).toBe(33)
		})
	})
})
