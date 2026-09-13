/**
 * Framer Motion Animation Variants Configuration
 *
 * Centralized animation definitions for consistent animations throughout the quiz app.
 * All variants follow Framer Motion's variant specification pattern.
 *
 * @module animations
 * @requires framer-motion
 * @requirements 7.1-7.8, 13.3 - Animation_System requirements
 */

/**
 * Page transition variants for screen entrance/exit animations
 * Used by AnimatedPage wrapper component
 *
 * @type {Object}
 * @property {Object} initial - Initial state (fade in from below)
 * @property {Object} animate - Animated state (fully visible)
 * @property {Object} exit - Exit state (fade out upwards)
 * @requirements 7.1, 7.2, 7.8
 */
export const pageVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 }
}

/**
 * Page transition configuration
 * Defines timing and easing for page animations
 *
 * @type {Object}
 * @property {string} type - Animation type ('tween' for standard easing)
 * @property {string} ease - Easing function
 * @property {number} duration - Animation duration in seconds
 */
export const pageTransition = {
	type: 'tween',
	ease: 'easeInOut',
	duration: 0.3
}

/**
 * Question slide-in variants for question display animations
 * Slides content horizontally when transitioning between questions
 *
 * @type {Object}
 * @property {Object} initial - Initial state (slide in from right)
 * @property {Object} animate - Animated state (centered)
 * @property {Object} exit - Exit state (slide out to left)
 * @requirements 7.3
 */
export const questionVariants = {
	initial: { opacity: 0, x: 50 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -50 }
}

/**
 * Container variants for staggered answer animations
 * Parent container that orchestrates child animation timing
 *
 * @type {Object}
 * @property {Object} animate - Animation state with stagger configuration
 * @requirements 7.4
 */
export const answersContainerVariants = {
	animate: {
		transition: {
			staggerChildren: 0.1
		}
	}
}

/**
 * Individual answer option variants
 * Provides fade-in animation for each answer button
 *
 * @type {Object}
 * @property {Object} initial - Initial state (invisible, below position)
 * @property {Object} animate - Animated state (visible)
 * @property {Object} exit - Exit state (fade out)
 * @requirements 7.4
 */
export const answerVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0 }
}
