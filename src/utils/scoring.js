/**
 * Scoring utility functions for quiz results calculation
 * @module utils/scoring
 */

/**
 * Calculate score as a percentage
 * @param {number} correct - Number of correct answers
 * @param {number} total - Total number of questions
 * @returns {number} Score percentage (0-100), rounded to nearest integer
 */
export function calculateScore(correct, total) {
	if (total <= 0) {
		return 0
	}

	if (correct < 0) {
		return 0
	}

	if (correct > total) {
		return 100
	}

	return Math.round((correct / total) * 100)
}

/**
 * Calculate breakdown percentages for quiz results
 * @param {Object} results - Quiz results with correct, wrong, skipped counts
 * @param {number} results.correct - Number of correct answers
 * @param {number} results.wrong - Number of wrong answers
 * @param {number} results.skipped - Number of skipped questions
 * @returns {Object} Percentages for correct, wrong, skipped (each 0-100)
 */
export function calculatePercentages(results) {
	const { correct = 0, wrong = 0, skipped = 0 } = results || {}

	const total = correct + wrong + skipped

	if (total <= 0) {
		return {
			correct: 0,
			wrong: 0,
			skipped: 0
		}
	}

	return {
		correct: Math.round((correct / total) * 100),
		wrong: Math.round((wrong / total) * 100),
		skipped: Math.round((skipped / total) * 100)
	}
}
