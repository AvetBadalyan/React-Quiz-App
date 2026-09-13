import { motion } from 'framer-motion'

/**
 * ProgressBar Component
 *
 * An animated progress bar with Framer Motion transitions.
 * Supports a warning state with distinct styling for time-critical situations.
 * Implements proper ARIA attributes for accessibility.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.progress=1] - Progress value from 0 (empty) to 1 (full)
 * @param {boolean} [props.isWarning=false] - Whether to display warning state styling
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel] - Custom aria-label (defaults to "Progress: X%")
 * @returns {JSX.Element} Progress bar element
 *
 * @example
 * // Normal progress bar at 75%
 * <ProgressBar progress={0.75} />
 *
 * @example
 * // Warning state progress bar at 20%
 * <ProgressBar progress={0.2} isWarning={true} ariaLabel="Time remaining" />
 *
 * @requirements 5.1-5.3, 7.7, 13.1, 13.3 - Progress indicators with smooth animations
 */
export function ProgressBar({
	progress = 1,
	isWarning = false,
	className,
	ariaLabel
}) {
	const percentValue = Math.round(progress * 100)

	return (
		<div
			className={`progress-bar ${className || ''}`}
			role="progressbar"
			aria-valuenow={percentValue}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label={ariaLabel || `Progress: ${percentValue}%`}
			aria-live="off"
		>
			<motion.div
				className={`progress-bar__fill ${isWarning ? 'progress-bar__fill--warning' : ''}`}
				initial={{ width: '100%' }}
				animate={{ width: `${percentValue}%` }}
				transition={{ duration: 0.1, ease: 'linear' }}
				aria-hidden="true"
			/>
		</div>
	)
}
