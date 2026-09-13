import { motion } from 'framer-motion'

/**
 * New record badge component
 * Shows an animated "New Record!" indicator when a user achieves a new high score
 *
 * @component
 * @example
 * <NewRecordBadge />
 *
 * Requirements: 8.5, 8.6, Accessibility best practices
 * - 8.5: WHEN the Summary_Screen displays a new high score, THE Summary_Screen SHALL indicate that a new record was achieved
 * - 8.6: WHEN a high score is saved, THE Summary_Screen SHALL always trigger the new record indication
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
