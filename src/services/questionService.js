/**
 * Question service — selects, filters, and counts quiz questions
 * by category, difficulty, and topic.
 */

import { getQuestionsByCategory } from '../data/questions/index.js'
import { shuffle } from '../utils/shuffle.js'

/**
 * Selects a shuffled set of questions for a quiz session.
 *
 * Questions matching the chosen difficulty come first; if there aren't
 * enough, the remainder is filled from other difficulties so the quiz
 * always has the requested number of questions when possible.
 *
 * @param {string} category - 'html' | 'css' | 'javascript' | 'react'
 * @param {'easy' | 'medium' | 'hard'} difficulty - Preferred difficulty
 * @param {string[]} topics - Topic filters (empty array = all topics)
 * @param {number} count - Number of questions to select
 * @returns {Object[]} Selected, shuffled questions
 */
export function selectQuestions(category, difficulty, topics, count) {
	let pool = getQuestionsByCategory(category)

	if (topics && topics.length > 0) {
		pool = pool.filter(q => q.topic && topics.includes(q.topic))
	}

	const matching = shuffle(pool.filter(q => q.difficulty === difficulty))
	const others = shuffle(pool.filter(q => q.difficulty !== difficulty))

	// Take matching-difficulty questions first, then top up from the rest.
	const selected = [...matching, ...others].slice(0, count)

	return shuffle(selected)
}

/**
 * Gets available topics for a category by examining the question bank
 *
 * @param {string} category - The category to get topics for
 * @returns {string[]} Array of unique topic tags found in the category's questions
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
 */
export function countAvailableQuestions(category, topics) {
	let pool = getQuestionsByCategory(category)

	if (topics && topics.length > 0) {
		pool = pool.filter(q => q.topic && topics.includes(q.topic))
	}

	return pool.length
}
