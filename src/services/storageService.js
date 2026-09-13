/**
 * Storage Service
 *
 * Provides localStorage abstraction with JSON serialization and high score management.
 * Implements version migration support for backwards compatibility.
 *
 * Requirements: 8.1-8.8
 */

const STORAGE_KEYS = {
	HIGH_SCORES: 'quizHighScores',
	SOUND_ENABLED: 'soundEnabled',
	PREFERENCES: 'quizPreferences'
}

const CURRENT_VERSION = 1

/**
 * Get a value from localStorage with JSON parsing
 * @param {string} key - The storage key
 * @param {*} defaultValue - Default value if key doesn't exist or parsing fails
 * @returns {*} The parsed value or defaultValue
 */
function get(key, defaultValue = null) {
	try {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : defaultValue
	} catch (error) {
		console.warn(`Failed to read from localStorage: ${key}`, error)
		return defaultValue
	}
}

/**
 * Set a value in localStorage with JSON serialization
 * @param {string} key - The storage key
 * @param {*} value - The value to store
 * @returns {boolean} True if successful, false otherwise
 */
function set(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value))
		return true
	} catch (error) {
		console.warn(`Failed to write to localStorage: ${key}`, error)
		return false
	}
}

/**
 * Migrate old high score formats to current version
 * Handles backwards compatibility when schema changes
 * @param {Object} oldData - Old high scores data
 * @returns {Object} Migrated high scores in current format
 */
function migrateHighScores(oldData) {
	const migrated = {
		version: CURRENT_VERSION,
		scores: oldData.scores || {}
	}

	// If oldData has scores directly at root level (very old format),
	// try to extract them
	if (!oldData.scores && typeof oldData === 'object') {
		Object.keys(oldData).forEach(key => {
			if (key.includes('-') && typeof oldData[key] === 'object') {
				migrated.scores[key] = oldData[key]
			}
		})
	}

	set(STORAGE_KEYS.HIGH_SCORES, migrated)
	return migrated
}

/**
 * Get high scores with migration support
 * @returns {Object} High scores object with version and scores properties
 */
function getHighScores() {
	const data = get(STORAGE_KEYS.HIGH_SCORES, {
		version: CURRENT_VERSION,
		scores: {}
	})

	if (!data.version || data.version < CURRENT_VERSION) {
		return migrateHighScores(data)
	}

	return data
}

/**
 * Save a high score if it's better than existing
 * @param {string} category - Question category (html, css, javascript, react)
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @param {Object} scoreData - Score data object
 * @returns {boolean} True if new record was saved, false otherwise
 */
function saveHighScore(category, difficulty, scoreData) {
	const key = `${category}-${difficulty}`
	const highScores = getHighScores()
	const existing = highScores.scores[key]

	if (!existing || scoreData.score > existing.score) {
		highScores.scores[key] = {
			score: scoreData.score,
			correctCount: scoreData.correctCount,
			totalCount: scoreData.totalCount,
			timestamp: Date.now()
		}
		set(STORAGE_KEYS.HIGH_SCORES, highScores)
		return true
	}

	return false
}

/**
 * Get high score for specific category and difficulty
 * @param {string} category - Question category
 * @param {string} difficulty - Difficulty level
 * @returns {Object|null} High score entry or null if none exists
 */
function getHighScore(category, difficulty) {
	const key = `${category}-${difficulty}`
	const highScores = getHighScores()
	return highScores.scores[key] || null
}

export const storageService = {
	get,
	set,
	getHighScores,
	saveHighScore,
	getHighScore
}

export { STORAGE_KEYS }
