/**
 * Storage service — a thin localStorage wrapper with JSON serialization
 * plus helpers for reading and saving quiz high scores.
 *
 * High scores are keyed by "category-difficulty", e.g. "react-hard".
 */

export const STORAGE_KEYS = {
	HIGH_SCORES: 'quizHighScores',
	SOUND_ENABLED: 'soundEnabled'
}

function get(key, defaultValue = null) {
	try {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : defaultValue
	} catch (error) {
		console.warn(`Failed to read from localStorage: ${key}`, error)
		return defaultValue
	}
}

function set(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value))
		return true
	} catch (error) {
		console.warn(`Failed to write to localStorage: ${key}`, error)
		return false
	}
}

function scoreKey(category, difficulty) {
	return `${category}-${difficulty}`
}

function getHighScore(category, difficulty) {
	const scores = get(STORAGE_KEYS.HIGH_SCORES, {})
	return scores[scoreKey(category, difficulty)] || null
}

/**
 * Save a score if it beats the existing high score.
 * @returns {boolean} true when a new record was stored.
 */
function saveHighScore(
	category,
	difficulty,
	{ score, correctCount, totalCount }
) {
	const scores = get(STORAGE_KEYS.HIGH_SCORES, {})
	const key = scoreKey(category, difficulty)
	const existing = scores[key]

	if (existing && score <= existing.score) return false

	scores[key] = { score, correctCount, totalCount, timestamp: Date.now() }
	set(STORAGE_KEYS.HIGH_SCORES, scores)
	return true
}

export const storageService = {
	get,
	set,
	getHighScore,
	saveHighScore
}
