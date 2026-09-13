/**
 * Question Service
 *
 * Provides functions for selecting, filtering, and counting quiz questions
 * based on category, difficulty, and topic criteria.
 *
 * Requirements: 2.3, 3.4-3.8, 9.3, 9.4
 */

import { getQuestionsByCategory } from '../data/questions/index.js'
import { shuffle } from '../utils/shuffle.js'

/**
 * Selects questions for a quiz session based on configuration
 *
 * Logic:
 * 1. Get questions by category using getQuestionsByCategory
 * 2. Filter by topics if specified (questions where topic is in the topics array)
 * 3. Prioritize matching difficulty - take from matching difficulty first
 * 4. Fill remaining slots from other difficulties if needed
 * 5. Shuffle and return the required count
 *
 * @param {string} category - Question category ('html', 'css', 'javascript', 'react')
 * @param {'easy' | 'medium' | 'hard'} difficulty - Difficulty level
 * @param {string[]} topics - Selected topic filters (empty array = all topics)
 * @param {number} count - Number of questions to select
 * @returns {Question[]} Selected and shuffled questions
 *
 * Requirements: 2.3, 3.4-3.8, 9.3, 9.4
 */
export function selectQuestions(category, difficulty, topics, count) {
	// Step 1: Get questions by category
	let pool = getQuestionsByCategory(category)

	// Step 2: Filter by topics if specified
	if (topics && topics.length > 0) {
		pool = pool.filter(q => q.topic && topics.includes(q.topic))
	}

	// Step 3: Separate questions by matching and non-matching difficulty
	const matchingDifficulty = pool.filter(q => q.difficulty === difficulty)
	const otherDifficulty = pool.filter(q => q.difficulty !== difficulty)

	let selected = []

	// Step 4: First, take from matching difficulty (shuffled for randomization)
	const shuffledMatching = shuffle([...matchingDifficulty])
	selected = shuffledMatching.slice(0, count)

	// Step 5: If not enough, fill from other difficulties
	if (selected.length < count) {
		const remaining = count - selected.length
		const shuffledOther = shuffle([...otherDifficulty])
		const filler = shuffledOther.slice(0, remaining)
		selected = [...selected, ...filler]
	}

	// Step 6: Shuffle the final selection and return
	return shuffle(selected)
}

/**
 * Gets available topics for a category by examining the question bank
 *
 * @param {string} category - The category to get topics for
 * @returns {string[]} Array of unique topic tags found in the category's questions
 *
 * Requirements: 9.1
 */
export function getTopicsForCategory(category) {
	const questions = getQuestionsByCategory(category)
	const topics = new Set(questions.map(q => q.topic).filter(Boolean))
	return Array.from(topics)
}

/**
 * Counts questions available for given filters
 *
 * @param {string} category - Question category
 * @param {string[]} topics - Selected topic filters (empty array = all topics)
 * @returns {number} Available question count matching the criteria
 *
 * Requirements: 9.5
 */
export function countAvailableQuestions(category, topics) {
	let pool = getQuestionsByCategory(category)

	if (topics && topics.length > 0) {
		pool = pool.filter(q => q.topic && topics.includes(q.topic))
	}

	return pool.length
}
