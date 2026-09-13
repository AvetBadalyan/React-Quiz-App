/**
 * Storage Service
 *
 * Thin localStorage abstraction with JSON serialization and high score management.
 */

export const STORAGE_KEYS = {
	HIGH_SCORES: 'quizHighScores',
	SOUND_ENABLED: 'soundEnabled'
}

const CURRENT_VERSION = 1

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

function getHighScores() {
	const data = get(STORAGE_KEYS.HIGH_SCORES, {
		version: CURRENT_VERSION,
		scores: {}
	})

	// Migrate if schema is old (version missing or outdated)
	if (!data.version || data.version < CURRENT_VERSION) {
		const migrated = { version: CURRENT_VERSION, scores: data.scores || {} }
		// Handle very old format where scores were stored at root level
		if (!data.scores && typeof data === 'object') {
			Object.keys(data).forEach(key => {
				if (key.includes('-') && typeof data[key] === 'object') {
					migrated.scores[key] = data[key]
				}
			})
		}
		set(STORAGE_KEYS.HIGH_SCORES, migrated)
		return migrated
	}

	return data
}

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

function getHighScore(category, difficulty) {
	const key = `${category}-${difficulty}`
	return getHighScores().scores[key] || null
}

export const storageService = {
	get,
	set,
	getHighScores,
	saveHighScore,
	getHighScore
}
