import { useCallback, useState } from 'react'
import { storageService } from '../services/storageService.js'
import { calculateScore } from '../utils/scoring.js'

/**
 * Hook for managing high scores.
 * Uses calculateScore from scoring.js to avoid duplicating the formula.
 *
 * @returns {{ getHighScore, checkAndSaveHighScore, lastSaveResult }}
 */
export function useHighScores() {
	const [lastSaveResult, setLastSaveResult] = useState(null)

	const getHighScore = useCallback((category, difficulty) => {
		return storageService.getHighScore(category, difficulty)
	}, [])

	const checkAndSaveHighScore = useCallback(
		(category, difficulty, correctCount, totalCount) => {
			const score = calculateScore(correctCount, totalCount)
			const isNewRecord = storageService.saveHighScore(category, difficulty, {
				score,
				correctCount,
				totalCount
			})
			setLastSaveResult({ isNewRecord, score })
			return isNewRecord
		},
		[]
	)

	return { getHighScore, checkAndSaveHighScore, lastSaveResult }
}
