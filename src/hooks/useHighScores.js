import { useCallback } from 'react'
import { storageService } from '../services/storageService.js'
import { calculateScore } from '../utils/scoring.js'

/**
 * Hook for reading and saving quiz high scores.
 * Delegates persistence to storageService and reuses calculateScore
 * so the scoring formula lives in one place.
 */
export function useHighScores() {
	const getHighScore = useCallback(
		(category, difficulty) => storageService.getHighScore(category, difficulty),
		[]
	)

	const checkAndSaveHighScore = useCallback(
		(category, difficulty, correctCount, totalCount) => {
			const score = calculateScore(correctCount, totalCount)
			return storageService.saveHighScore(category, difficulty, {
				score,
				correctCount,
				totalCount
			})
		},
		[]
	)

	return { getHighScore, checkAndSaveHighScore }
}
