/**
 * Show the timer warning (colour + pulse + sound) when this many
 * milliseconds remain. Shared across all difficulties.
 */
export const TIMER_WARNING_THRESHOLD = 5000

/**
 * Difficulty configuration for quiz sessions.
 * Each level defines timer duration and question count.
 *
 * @typedef {Object} DifficultyConfig
 * @property {string} label - Display name for the difficulty level
 * @property {number} timerDuration - Time per question in milliseconds
 * @property {number} questionCount - Number of questions in quiz
 */

/**
 * @type {Object.<string, DifficultyConfig>}
 */
export const DIFFICULTY_CONFIG = {
	easy: {
		label: 'Easy',
		timerDuration: 30000,
		questionCount: 10
	},
	medium: {
		label: 'Medium',
		timerDuration: 20000,
		questionCount: 15
	},
	hard: {
		label: 'Hard',
		timerDuration: 15000,
		questionCount: 20
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
