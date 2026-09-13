/**
 * Question Bank Aggregator
 *
 * Combines all category question arrays into a single interface for quiz operations.
 *
 * Exports:
 * - questionBank: Object containing all questions organized by category
 * - getAllQuestions(): Returns all questions from all categories
 * - getQuestionsByCategory(category): Returns questions for a specific category
 */

import cssQuestions from './css.js'
import htmlQuestions from './html.js'
import javascriptQuestions from './javascript.js'
import jstrickyQuestions from './jstricky.js'
import reactQuestions from './react.js'

export const questionBank = {
	html: htmlQuestions,
	css: cssQuestions,
	javascript: javascriptQuestions,
	react: reactQuestions,
	jstricky: jstrickyQuestions
}

/**
 * Returns all questions from all categories combined into a single array
 * @returns {Array} All questions from the question bank
 */
export function getAllQuestions() {
	return Object.values(questionBank).flat()
}

/**
 * Returns questions for a specific category
 * @param {string} category - The category to retrieve ('html', 'css', 'javascript', 'react')
 * @returns {Array} Questions for the specified category, or empty array if category not found
 */
export function getQuestionsByCategory(category) {
	return questionBank[category] || []
}
