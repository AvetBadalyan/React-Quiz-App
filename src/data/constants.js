/**
 * Difficulty configuration for quiz sessions
 * Each level defines timer duration, question count, and warning threshold
 *
 * @typedef {Object} DifficultyConfig
 * @property {string} label - Display name for the difficulty level
 * @property {number} timerDuration - Time per question in milliseconds
 * @property {number} questionCount - Number of questions in quiz
 * @property {number} warningThreshold - Time remaining to trigger warning (ms)
 */

/**
 * @type {Object.<string, DifficultyConfig>}
 */
export const DIFFICULTY_CONFIG = {
	easy: {
		label: 'Easy',
		timerDuration: 30000,
		questionCount: 10,
		warningThreshold: 5000
	},
	medium: {
		label: 'Medium',
		timerDuration: 20000,
		questionCount: 15,
		warningThreshold: 5000
	},
	hard: {
		label: 'Hard',
		timerDuration: 15000,
		questionCount: 20,
		warningThreshold: 5000
	}
}

/**
 * Category configuration for quiz categories
 * Each category has an id, label, icon, available topics, and theme color
 *
 * @typedef {Object} CategoryConfig
 * @property {string} id - Category identifier
 * @property {string} label - Display name for the category
 * @property {string} icon - Emoji icon for the category
 * @property {string[]} topics - Available topic filters within the category
 * @property {string} color - Theme color for the category (hex)
 */

/**
 * @type {Object.<string, CategoryConfig>}
 */
export const CATEGORY_CONFIG = {
	html: {
		id: 'html',
		label: 'HTML',
		icon: '🌐',
		topics: ['forms', 'semantics', 'accessibility', 'media'],
		color: '#e44d26'
	},
	css: {
		id: 'css',
		label: 'CSS',
		icon: '🎨',
		topics: ['selectors', 'flexbox', 'grid', 'animations'],
		color: '#264de4'
	},
	javascript: {
		id: 'javascript',
		label: 'JavaScript',
		icon: '⚡',
		topics: ['closures', 'promises', 'dom', 'arrays'],
		color: '#f7df1e'
	},
	react: {
		id: 'react',
		label: 'React',
		icon: '⚛️',
		topics: ['hooks', 'components', 'state', 'jsx'],
		color: '#61dafb'
	}
}

/**
 * Get difficulty levels as an array for iteration
 * @returns {string[]} Array of difficulty level keys
 */
export function getDifficultyLevels() {
	return Object.keys(DIFFICULTY_CONFIG)
}

/**
 * Get categories as an array for iteration
 * @returns {string[]} Array of category keys
 */
export function getCategories() {
	return Object.keys(CATEGORY_CONFIG)
}

/**
 * Get configuration for a specific difficulty level
 * @param {string} difficulty - The difficulty level key
 * @returns {DifficultyConfig|null} The difficulty configuration or null if not found
 */
export function getDifficultyConfig(difficulty) {
	return DIFFICULTY_CONFIG[difficulty] || null
}

/**
 * Get configuration for a specific category
 * @param {string} category - The category key
 * @returns {CategoryConfig|null} The category configuration or null if not found
 */
export function getCategoryConfig(category) {
	return CATEGORY_CONFIG[category] || null
}
