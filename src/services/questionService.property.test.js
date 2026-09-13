/**
 * Property-based tests for questionService
 *
 * Tests the filtering and difficulty prioritization logic in selectQuestions function.
 * Uses fast-check for property-based testing.
 *
 * **Validates: Requirements 2.3, 9.3, 9.4, 3.7, 3.8**
 */

import * as fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '../data/constants.js'
import {
	getQuestionsByCategory,
	questionBank
} from '../data/questions/index.js'
import { countAvailableQuestions, selectQuestions } from './questionService.js'

// Helper to get valid categories and difficulties for generators
const validCategories = Object.keys(CATEGORY_CONFIG)
const validDifficulties = Object.keys(DIFFICULTY_CONFIG)

// Smart generator for category
const categoryArb = fc.constantFrom(...validCategories)

// Smart generator for difficulty
const difficultyArb = fc.constantFrom(...validDifficulties)

// Smart generator for count (reasonable quiz sizes)
const countArb = fc.integer({ min: 1, max: 25 })

// Generator for topics based on a category
const topicsArb = category => {
	const categoryConfig = CATEGORY_CONFIG[category]
	if (
		!categoryConfig ||
		!categoryConfig.topics ||
		categoryConfig.topics.length === 0
	) {
		return fc.constant([])
	}
	return fc.subarray(categoryConfig.topics, { minLength: 0 })
}

describe('questionService - Property Tests', () => {
	/**
	 * **Validates: Requirements 2.3, 9.3, 9.4**
	 *
	 * Property 1: Question filtering returns only matching questions
	 *
	 * Test Requirements:
	 * 1. When filtering by category, all returned questions belong to that category
	 * 2. When filtering by topics, all returned questions have one of the specified topics
	 * 3. Questions not matching the filters are never included
	 */
	describe('Property 1: Question filtering returns only matching questions', () => {
		it('should return only questions belonging to the selected category', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const questions = selectQuestions(category, difficulty, [], count)

						// Property: All returned questions must belong to the selected category
						const allMatchCategory = questions.every(
							q => q.category === category
						)
						expect(allMatchCategory).toBe(true)
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should never include questions from other categories', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const questions = selectQuestions(category, difficulty, [], count)
						const otherCategories = validCategories.filter(c => c !== category)

						// Property: No returned question should belong to another category
						const noneFromOtherCategories = questions.every(
							q => !otherCategories.includes(q.category)
						)
						expect(noneFromOtherCategories).toBe(true)
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should return only questions with matching topics when topics are specified', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const categoryConfig = CATEGORY_CONFIG[category]
						if (
							!categoryConfig ||
							!categoryConfig.topics ||
							categoryConfig.topics.length === 0
						) {
							return // Skip if no topics defined for this category
						}

						// Test with each individual topic
						for (const topic of categoryConfig.topics) {
							const questions = selectQuestions(
								category,
								difficulty,
								[topic],
								count
							)

							// Property: All returned questions must have the specified topic
							const allMatchTopic = questions.every(q => q.topic === topic)
							expect(allMatchTopic).toBe(true)
						}
					}
				),
				{ numRuns: 50 }
			)
		})

		it('should return only questions matching any of the specified topics when multiple topics given', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const categoryConfig = CATEGORY_CONFIG[category]
						if (
							!categoryConfig ||
							!categoryConfig.topics ||
							categoryConfig.topics.length < 2
						) {
							return // Skip if fewer than 2 topics available
						}

						// Use a subset of topics (first two topics)
						const selectedTopics = categoryConfig.topics.slice(0, 2)
						const questions = selectQuestions(
							category,
							difficulty,
							selectedTopics,
							count
						)

						// Property: All returned questions must have a topic in the selected topics array
						const allMatchSelectedTopics = questions.every(
							q => q.topic && selectedTopics.includes(q.topic)
						)
						expect(allMatchSelectedTopics).toBe(true)
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should never include questions outside selected topics when topics are specified', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const categoryConfig = CATEGORY_CONFIG[category]
						if (
							!categoryConfig ||
							!categoryConfig.topics ||
							categoryConfig.topics.length < 2
						) {
							return // Skip if fewer than 2 topics available
						}

						// Select just one topic
						const selectedTopic = categoryConfig.topics[0]
						const questions = selectQuestions(
							category,
							difficulty,
							[selectedTopic],
							count
						)
						const excludedTopics = categoryConfig.topics.filter(
							t => t !== selectedTopic
						)

						// Property: No returned question should have a topic from excluded topics
						const noneFromExcludedTopics = questions.every(
							q => !excludedTopics.includes(q.topic)
						)
						expect(noneFromExcludedTopics).toBe(true)
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should include questions from all topics when empty topics array is provided', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const allCategoryQuestions = getQuestionsByCategory(category)
						const questions = selectQuestions(category, difficulty, [], count)

						// Property: All returned questions should be from the category's question pool
						const allFromCategory = questions.every(q =>
							allCategoryQuestions.some(cq => cq.id === q.id)
						)
						expect(allFromCategory).toBe(true)
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should have countAvailableQuestions match actual filtered count', () => {
			fc.assert(
				fc.property(categoryArb, category => {
					const categoryConfig = CATEGORY_CONFIG[category]
					const allQuestions = getQuestionsByCategory(category)

					// Test with empty topics (all questions)
					const countAll = countAvailableQuestions(category, [])
					expect(countAll).toBe(allQuestions.length)

					// Test with each individual topic
					if (categoryConfig && categoryConfig.topics) {
						for (const topic of categoryConfig.topics) {
							const count = countAvailableQuestions(category, [topic])
							const filtered = allQuestions.filter(q => q.topic === topic)
							expect(count).toBe(filtered.length)
						}
					}
				}),
				{ numRuns: 100 }
			)
		})

		it('should return questions that exist in the original question bank', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const originalQuestions = getQuestionsByCategory(category)
						const questions = selectQuestions(category, difficulty, [], count)

						// Property: Every returned question ID should exist in the original bank
						const allExistInOriginal = questions.every(q =>
							originalQuestions.some(orig => orig.id === q.id)
						)
						expect(allExistInOriginal).toBe(true)
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should return questions with valid structure', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const questions = selectQuestions(category, difficulty, [], count)

						// Property: All returned questions should have required fields
						const allValid = questions.every(
							q =>
								typeof q.id === 'string' &&
								typeof q.text === 'string' &&
								Array.isArray(q.answers) &&
								q.answers.length >= 2 &&
								typeof q.category === 'string' &&
								typeof q.difficulty === 'string'
						)
						expect(allValid).toBe(true)
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should handle arbitrary topic subsets correctly', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const categoryConfig = CATEGORY_CONFIG[category]
						if (
							!categoryConfig ||
							!categoryConfig.topics ||
							categoryConfig.topics.length === 0
						) {
							return // Skip if no topics
						}

						// Test with all possible non-empty subsets up to 3 topics
						const maxTopicsToTest = Math.min(3, categoryConfig.topics.length)

						for (let i = 1; i <= maxTopicsToTest; i++) {
							const selectedTopics = categoryConfig.topics.slice(0, i)
							const questions = selectQuestions(
								category,
								difficulty,
								selectedTopics,
								count
							)

							// Every question must have a topic in selectedTopics
							const allValid = questions.every(
								q => q.topic && selectedTopics.includes(q.topic)
							)
							expect(allValid).toBe(true)
						}
					}
				),
				{ numRuns: 50 }
			)
		})
	})

	/**
	 * **Validates: Requirements 3.7, 3.8**
	 *
	 * Property 3: Question selection prioritizes matching difficulty
	 *
	 * Test Requirements:
	 * 1. If enough questions of matching difficulty exist, all returned questions are of that difficulty
	 * 2. If not enough matching difficulty questions, the result contains all matching difficulty questions first
	 * 3. Other difficulty questions are only included when matching difficulty is insufficient
	 */
	describe('Property 3: Question selection prioritizes matching difficulty', () => {
		it('should return only matching difficulty questions when enough exist', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const topics = [] // All topics to maximize pool

						// Get the pool of questions for this category
						const pool = questionBank[category] || []
						const matchingDifficultyCount = pool.filter(
							q => q.difficulty === difficulty
						).length

						// Only test when we have enough matching difficulty questions
						if (matchingDifficultyCount >= count && count > 0) {
							const result = selectQuestions(
								category,
								difficulty,
								topics,
								count
							)

							// All returned questions should be of matching difficulty
							const allMatchingDifficulty = result.every(
								q => q.difficulty === difficulty
							)

							expect(allMatchingDifficulty).toBe(true)
						}
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should include all available matching difficulty questions when not enough exist', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const topics = [] // All topics

						// Get the pool of questions
						const pool = questionBank[category] || []
						const matchingDifficultyQuestions = pool.filter(
							q => q.difficulty === difficulty
						)
						const otherDifficultyQuestions = pool.filter(
							q => q.difficulty !== difficulty
						)

						const matchingCount = matchingDifficultyQuestions.length
						const otherCount = otherDifficultyQuestions.length
						const totalAvailable = matchingCount + otherCount

						// Only test when we DON'T have enough matching difficulty questions
						// but we DO have some matching and some other
						if (matchingCount > 0 && matchingCount < count && otherCount > 0) {
							const result = selectQuestions(
								category,
								difficulty,
								topics,
								count
							)

							// Count how many matching difficulty questions are in result
							const matchingInResult = result.filter(
								q => q.difficulty === difficulty
							).length

							// Should include ALL available matching difficulty questions
							// (up to the requested count)
							const expectedMatchingInResult = Math.min(matchingCount, count)
							expect(matchingInResult).toBe(expectedMatchingInResult)
						}
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should only include other difficulty questions when matching is insufficient', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						const topics = [] // All topics

						// Get the pool of questions
						const pool = questionBank[category] || []
						const matchingDifficultyQuestions = pool.filter(
							q => q.difficulty === difficulty
						)
						const otherDifficultyQuestions = pool.filter(
							q => q.difficulty !== difficulty
						)

						const matchingCount = matchingDifficultyQuestions.length
						const otherCount = otherDifficultyQuestions.length

						// Test the property
						const result = selectQuestions(category, difficulty, topics, count)

						// Count questions by difficulty type
						const matchingInResult = result.filter(
							q => q.difficulty === difficulty
						).length
						const otherInResult = result.filter(
							q => q.difficulty !== difficulty
						).length

						// If there are any "other" difficulty questions in result,
						// it should only be because matching was insufficient
						if (otherInResult > 0) {
							// This means matching difficulty couldn't fill all slots
							// So all matching questions should be included
							expect(matchingInResult).toBe(Math.min(matchingCount, count))
						}

						// If we have enough matching difficulty questions,
						// there should be no "other" difficulty questions
						if (matchingCount >= count && count > 0) {
							expect(otherInResult).toBe(0)
						}
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should respect difficulty prioritization with topic filtering', () => {
			fc.assert(
				fc.property(
					categoryArb,
					difficultyArb,
					countArb,
					(category, difficulty, count) => {
						// Get topics for this category
						const categoryConfig = CATEGORY_CONFIG[category]
						if (
							!categoryConfig ||
							!categoryConfig.topics ||
							categoryConfig.topics.length === 0
						) {
							return // Skip if no topics defined
						}

						// Pick a random subset of topics (at least 1)
						const allTopics = categoryConfig.topics
						const selectedTopics = allTopics.slice(
							0,
							Math.max(1, Math.floor(allTopics.length / 2))
						)

						// Get the filtered pool of questions
						const pool = questionBank[category] || []
						const filteredPool = pool.filter(
							q => q.topic && selectedTopics.includes(q.topic)
						)

						const matchingDifficultyInPool = filteredPool.filter(
							q => q.difficulty === difficulty
						)
						const otherDifficultyInPool = filteredPool.filter(
							q => q.difficulty !== difficulty
						)

						const matchingCount = matchingDifficultyInPool.length
						const otherCount = otherDifficultyInPool.length

						if (filteredPool.length === 0) {
							return // Skip if no questions match filters
						}

						const result = selectQuestions(
							category,
							difficulty,
							selectedTopics,
							count
						)

						// All results should be from selected topics
						const allMatchTopics = result.every(
							q => q.topic && selectedTopics.includes(q.topic)
						)
						expect(allMatchTopics).toBe(true)

						// Count questions by difficulty
						const matchingInResult = result.filter(
							q => q.difficulty === difficulty
						).length
						const otherInResult = result.filter(
							q => q.difficulty !== difficulty
						).length

						// Difficulty prioritization should still apply
						if (matchingCount >= count && count > 0) {
							// All should be matching difficulty
							expect(otherInResult).toBe(0)
						} else if (
							matchingCount > 0 &&
							matchingCount < count &&
							otherCount > 0
						) {
							// All matching should be included
							expect(matchingInResult).toBe(matchingCount)
						}
					}
				),
				{ numRuns: 100 }
			)
		})

		it('should not exceed available matching difficulty questions before using others', () => {
			fc.assert(
				fc.property(categoryArb, difficultyArb, (category, difficulty) => {
					const topics = []

					// Get the pool of questions
					const pool = questionBank[category] || []
					const matchingDifficultyQuestions = pool.filter(
						q => q.difficulty === difficulty
					)
					const totalQuestions = pool.length

					// Request more than matching but less than total
					const matchingCount = matchingDifficultyQuestions.length

					if (matchingCount > 0 && matchingCount < totalQuestions) {
						// Request exactly 1 more than matching count
						const count = matchingCount + 1
						const result = selectQuestions(category, difficulty, topics, count)

						// Should have exactly matchingCount questions of matching difficulty
						const matchingInResult = result.filter(
							q => q.difficulty === difficulty
						).length

						// Should have exactly 1 question from other difficulties
						const otherInResult = result.filter(
							q => q.difficulty !== difficulty
						).length

						expect(matchingInResult).toBe(matchingCount)
						expect(otherInResult).toBe(1)
					}
				}),
				{ numRuns: 100 }
			)
		})
	})
})
