import { motion } from 'framer-motion'
import { pageTransition, pageVariants } from '../../utils/animations.js'

/**
 * Animates a screen in and out. Each screen wraps its content in this, and the
 * screens are keyed inside <AnimatePresence> in App.jsx — framer-motion runs
 * this motion.div's exit animation before the old screen unmounts.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Screen content to animate
 */
export function AnimatedPage({ children }) {
	return (
		<motion.div
			className="animated-page"
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
