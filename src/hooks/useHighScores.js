import { useState, useCallback } from 'react'
import { storageService } from '../services/storageService.js'

/**
 * Hook for managing high scores
 *
 * Provides functionality to get and save high scores using the storageService.
 * Tracks the result of the last save operation to enable new record detection.
 *
 * Requirements: 8.1-8.6
 *
 * @returns {Object} High score utilities
 * @property {Function} getHighScore - Get high score for specific category and difficulty
 * @property {Function} checkAndSaveHighScore - Check and save high score, returns true if new record
 * @property {Object|null} lastSaveResult - Result of last save operation { isNewRecord, score }
 */
export function useHighScores() {
	const [lastSaveResult, setLastSaveResult] = useState(null)

	/**
	 * Get high score for specific category and difficulty
	 *
	 * @param {string} category - Question category (html, css, javascript, react)
	 * @param {string} difficulty - Difficulty level (easy, medium, hard)
	 * @returns {Object|null} High score entry or null if none exists
	 */
	const getHighScore = useCallback((category, difficulty) => {
		return storageService.getHighScore(category, difficulty)
	}, [])

	/**
	 * Check and save high score, returns true if new record
	 *
	 * Calculates the percentage score from correct and total count,
	 * then saves if it's a new record. Updates lastSaveResult state
	 * with the result.
	 *
	 * @param {string} category - Question category (html, css, javascript, react)
	 * @param {string} difficulty - Difficulty level (easy, medium, hard)
	 * @param {number} correctCount - Number of correct answers
	 * @param {number} totalCount - Total questions in the quiz
	 * @returns {boolean} True if new record was saved, false otherwise
	 */
	const checkAndSaveHighScore = useCallback((category, difficulty, correctCount, totalCount) => {
		const score = Math.round((correctCount / totalCount) * 100)
		const scoreData = { score, correctCount, totalCount }
		const isNewRecord = storageService.saveHighScore(category, difficulty, scoreData)
		setLastSaveResult({ isNewRecord, score })
		return isNewRecord
	}, [])

	return { getHighScore, checkAndSaveHighScore, lastSaveResult }
}
