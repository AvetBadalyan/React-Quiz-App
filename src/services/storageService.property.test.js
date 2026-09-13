/**
 * Property-based tests for the storage service high score functionality
 *
 * **Validates: Requirements 8.1, 8.2, 8.3**
 *
 * These tests verify that the storageService high score management:
 * 1. Returns true when no existing score (new record) - Req 8.3
 * 2. Returns true when new score > existing score (beats record) - Req 8.2
 * 3. Returns false when new score <= existing score (no new record) - Req 8.1, 8.2
 * 4. After saving, getHighScore returns the new score when it was a record
 *
 * Uses fast-check to test across many score combinations.
 */
import fc from 'fast-check'
import { beforeEach, describe, it, vi } from 'vitest'
import { storageService, STORAGE_KEYS } from './storageService.js'

// Create a localStorage mock for isolated testing
const createLocalStorageMock = () => {
	let store = {}
	return {
		getItem: vi.fn(key => store[key] || null),
		setItem: vi.fn((key, value) => {
			store[key] = value
		}),
		removeItem: vi.fn(key => {
			delete store[key]
		}),
		clear: vi.fn(() => {
			store = {}
		}),
		get store() {
			return store
		}
	}
}

describe('storageService high score property tests', () => {
	let localStorageMock

	beforeEach(() => {
		// Create fresh localStorage mock for each test
		localStorageMock = createLocalStorageMock()
		vi.stubGlobal('localStorage', localStorageMock)
	})

	// Valid categories and difficulties for the quiz app
	const categories = ['html', 'css', 'javascript', 'react']
	const difficulties = ['easy', 'medium', 'hard']

	// Arbitrary generators for quiz data
	const categoryArb = fc.constantFrom(...categories)
	const difficultyArb = fc.constantFrom(...difficulties)
	const scoreArb = fc.integer({ min: 0, max: 100 })
	const correctCountArb = fc.integer({ min: 0, max: 20 })
	const totalCountArb = fc.integer({ min: 1, max: 20 })

	// Generate valid score data
	const scoreDataArb = fc.record({
		score: scoreArb,
		correctCount: correctCountArb,
		totalCount: totalCountArb
	})

	/**
	 * Property 4.1: saveHighScore returns true when no existing score (new record)
	 * **Validates: Requirements 8.3**
	 *
	 * When no high score exists for a category-difficulty combination,
	 * saving any score should return true (indicating a new record).
	 */
	it('should return true when saving score with no existing high score', () => {
		fc.assert(
			fc.property(categoryArb, difficultyArb, scoreDataArb, (category, difficulty, scoreData) => {
				// Clear localStorage to ensure no existing score
				localStorageMock.clear()

				// Save the score
				const result = storageService.saveHighScore(category, difficulty, scoreData)

				// Should return true because there was no existing score
				return result === true
			})
		)
	})

	/**
	 * Property 4.2: saveHighScore returns true when new score > existing score
	 * **Validates: Requirements 8.2**
	 *
	 * When the new score percentage exceeds the stored high score,
	 * it should be saved and return true.
	 */
	it('should return true when new score exceeds existing high score', () => {
		fc.assert(
			fc.property(
				categoryArb,
				difficultyArb,
				fc.integer({ min: 0, max: 99 }), // existingScore: 0-99
				fc.integer({ min: 1, max: 100 }), // newScore: 1-100
				(category, difficulty, existingScore, scoreDiff) => {
					// Ensure new score is strictly greater than existing
					const newScore = Math.min(existingScore + scoreDiff, 100)
					
					// Skip if scores are equal (not what this test is for)
					if (newScore <= existingScore) return true

					// Clear and set up existing score
					localStorageMock.clear()
					const existingData = {
						version: 1,
						scores: {
							[`${category}-${difficulty}`]: {
								score: existingScore,
								correctCount: Math.floor(existingScore / 10),
								totalCount: 10,
								timestamp: Date.now() - 10000
							}
						}
					}
					localStorageMock.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(existingData))

					// Save the higher score
					const newScoreData = {
						score: newScore,
						correctCount: Math.floor(newScore / 10),
						totalCount: 10
					}
					const result = storageService.saveHighScore(category, difficulty, newScoreData)

					// Should return true because new score is higher
					return result === true
				}
			)
		)
	})

	/**
	 * Property 4.3: saveHighScore returns false when new score <= existing score
	 * **Validates: Requirements 8.1, 8.2**
	 *
	 * When the new score is equal to or less than the stored high score,
	 * it should NOT be saved and return false.
	 */
	it('should return false when new score is less than or equal to existing high score', () => {
		fc.assert(
			fc.property(
				categoryArb,
				difficultyArb,
				fc.integer({ min: 1, max: 100 }), // existingScore: 1-100 (must be > 0 to allow lower scores)
				fc.integer({ min: 0, max: 100 }), // newScore: 0-100
				(category, difficulty, existingScore, newScore) => {
					// Skip if new score is greater (not what this test is for)
					if (newScore > existingScore) return true

					// Clear and set up existing score
					localStorageMock.clear()
					const existingData = {
						version: 1,
						scores: {
							[`${category}-${difficulty}`]: {
								score: existingScore,
								correctCount: Math.floor(existingScore / 10),
								totalCount: 10,
								timestamp: Date.now() - 10000
							}
						}
					}
					localStorageMock.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(existingData))

					// Attempt to save lower or equal score
					const newScoreData = {
						score: newScore,
						correctCount: Math.floor(newScore / 10),
						totalCount: 10
					}
					const result = storageService.saveHighScore(category, difficulty, newScoreData)

					// Should return false because new score is not higher
					return result === false
				}
			)
		)
	})

	/**
	 * Property 4.4: After saving, getHighScore returns the new score when it was a record
	 * **Validates: Requirements 8.1, 8.2, 8.3**
	 *
	 * After successfully saving a high score (saveHighScore returns true),
	 * getHighScore should return the newly saved score data.
	 */
	it('should return the saved score via getHighScore when a new record is set', () => {
		fc.assert(
			fc.property(categoryArb, difficultyArb, scoreDataArb, (category, difficulty, scoreData) => {
				// Clear localStorage to ensure fresh state
				localStorageMock.clear()

				// Save the score (should succeed as no prior score)
				const saveResult = storageService.saveHighScore(category, difficulty, scoreData)

				// Should have succeeded
				if (!saveResult) return false

				// Retrieve the high score
				const retrieved = storageService.getHighScore(category, difficulty)

				// Verify the retrieved score matches what was saved
				if (!retrieved) return false
				if (retrieved.score !== scoreData.score) return false
				if (retrieved.correctCount !== scoreData.correctCount) return false
				if (retrieved.totalCount !== scoreData.totalCount) return false
				if (typeof retrieved.timestamp !== 'number') return false

				return true
			})
		)
	})

	/**
	 * Property 4.5: getHighScore returns null for non-existent category-difficulty
	 * **Validates: Requirements 8.1**
	 *
	 * When no high score exists for a category-difficulty combination,
	 * getHighScore should return null.
	 */
	it('should return null when no high score exists for category-difficulty', () => {
		fc.assert(
			fc.property(categoryArb, difficultyArb, (category, difficulty) => {
				// Clear localStorage
				localStorageMock.clear()

				// Get high score for non-existent entry
				const result = storageService.getHighScore(category, difficulty)

				// Should return null
				return result === null
			})
		)
	})

	/**
	 * Property 4.6: Saving to one category-difficulty doesn't affect others
	 * **Validates: Requirements 8.1**
	 *
	 * High scores are stored per category-difficulty combination.
	 * Saving a score for one combination should not affect others.
	 */
	it('should maintain separate high scores for different category-difficulty combinations', () => {
		fc.assert(
			fc.property(
				fc.array(
					fc.tuple(categoryArb, difficultyArb, scoreDataArb),
					{ minLength: 2, maxLength: 12 } // Test with multiple combinations
				),
				entries => {
					// Clear localStorage
					localStorageMock.clear()

					// Create a map to track the highest score for each combination
					const expectedScores = new Map()

					// Save all scores, tracking the highest for each combination
					for (const [category, difficulty, scoreData] of entries) {
						const key = `${category}-${difficulty}`
						const existing = expectedScores.get(key)

						// Only update expected if this score would be saved
						if (!existing || scoreData.score > existing.score) {
							expectedScores.set(key, scoreData)
						}

						// Actually save
						storageService.saveHighScore(category, difficulty, scoreData)
					}

					// Verify each combination has the expected highest score
					for (const [key, expectedData] of expectedScores) {
						const [category, difficulty] = key.split('-')
						const retrieved = storageService.getHighScore(category, difficulty)

						if (!retrieved) return false
						if (retrieved.score !== expectedData.score) return false
						if (retrieved.correctCount !== expectedData.correctCount) return false
						if (retrieved.totalCount !== expectedData.totalCount) return false
					}

					return true
				}
			)
		)
	})

	/**
	 * Property 4.7: High score updates only when strictly greater
	 * **Validates: Requirements 8.2**
	 *
	 * Edge case: when new score equals existing score exactly,
	 * it should NOT update (must be strictly greater to beat the record).
	 */
	it('should not update high score when new score equals existing score exactly', () => {
		fc.assert(
			fc.property(categoryArb, difficultyArb, scoreArb, (category, difficulty, score) => {
				// Clear localStorage
				localStorageMock.clear()

				const originalTimestamp = Date.now() - 10000

				// Set up existing score
				const existingData = {
					version: 1,
					scores: {
						[`${category}-${difficulty}`]: {
							score: score,
							correctCount: Math.floor(score / 10),
							totalCount: 10,
							timestamp: originalTimestamp
						}
					}
				}
				localStorageMock.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(existingData))

				// Try to save same score
				const sameScoreData = {
					score: score,
					correctCount: Math.floor(score / 5), // Different breakdown, same score
					totalCount: 20
				}
				const result = storageService.saveHighScore(category, difficulty, sameScoreData)

				// Should return false (not a new record)
				if (result !== false) return false

				// Retrieve and verify original data is preserved
				const retrieved = storageService.getHighScore(category, difficulty)

				// Original timestamp should be preserved (indicates no update)
				if (retrieved.timestamp !== originalTimestamp) return false

				// Original correct/total counts should be preserved
				if (retrieved.correctCount !== Math.floor(score / 10)) return false
				if (retrieved.totalCount !== 10) return false

				return true
			})
		)
	})
})
