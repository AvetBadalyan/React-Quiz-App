import { motion } from 'framer-motion'
import { pageTransition, pageVariants } from '../../utils/animations.js'

/**
 * AnimatedPage wrapper for page transition animations
 *
 * Wraps page content with Framer Motion animations for smooth
 * entrance and exit transitions between screens.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to animate
 * @returns {JSX.Element} Motion div with page transition animations
 *
 * @example
 * <AnimatedPage>
 *   <StartScreen />
 * </AnimatedPage>
 */
export function AnimatedPage({ children }) {
	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={pageTransition}
		>
			{children}
		</motion.div>
	)
}
