import { motion } from 'framer-motion'

/**
 * New record badge component
 * Shows an animated "New Record!" indicator when a user achieves a new high score
 *
 * @component
 * @example
 * <NewRecordBadge />
 */
export function NewRecordBadge() {
	return (
		<motion.div
			className="new-record-badge"
			initial={{ scale: 0, rotate: -10 }}
			animate={{ scale: 1, rotate: 0 }}
			transition={{ type: 'spring', stiffness: 260, damping: 20 }}
			role="status"
			aria-live="polite"
			aria-label="Congratulations! You achieved a new high score record"
		>
			<span aria-hidden="true">🎉</span> New Record!
		</motion.div>
	)
}
