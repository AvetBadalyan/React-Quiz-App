/**
 * QuestionTimer Component
 *
 * Visual countdown timer for quiz questions with warning state support.
 * Features:
 * - Progress bar showing time remaining
 * - Warning state at TIMER_WARNING_THRESHOLD with distinct color and pulsing animation
 * - Pause mode during feedback
 * - Integration with Sound Context for warning sound
 * - ARIA live region for screen reader announcements
 */

import { useSound } from '../../context/SoundContext.jsx'
import { TIMER_WARNING_THRESHOLD } from '../../data/constants.js'
import { useTimer } from '../../hooks/useTimer.js'
import { ProgressBar } from '../ui/ProgressBar.jsx'

/**
 * Question timer component with visual countdown
 * @param {Object} props
 * @param {number} props.duration - Total time in milliseconds
 * @param {Function} props.onTimeout - Callback when timer reaches 0
 * @param {boolean} props.isPaused - Whether timer should pause (during feedback)
 */
export function QuestionTimer({ duration, onTimeout, isPaused = false }) {
	const { playWarning } = useSound()

	const { timeRemaining, isWarning, progress } = useTimer(duration, {
		onTimeout,
		onWarning: playWarning,
		warningThreshold: TIMER_WARNING_THRESHOLD,
		isPaused
	})

	// Format time as seconds (round up for display)
	const seconds = Math.ceil(timeRemaining / 1000)

	// Determine appropriate aria-live politeness based on time remaining
	// Use assertive only when warning to avoid overwhelming screen reader users
	const ariaLive = isWarning ? 'assertive' : 'off'

	return (
		<div
			className="question-timer"
			role="timer"
			aria-label={`Time remaining: ${seconds} seconds${isWarning ? ', warning: time is running low' : ''}`}
		>
			<div className="question-timer__display">
				<span
					className={`question-timer__seconds ${isWarning ? 'question-timer__seconds--warning' : ''}`}
					aria-live={ariaLive}
					aria-atomic="true"
				>
					{seconds}s
				</span>
				{/* Screen reader only announcement for warning state */}
				{isWarning && (
					<span className="sr-only" role="alert">
						Warning: Only {seconds} seconds remaining
					</span>
				)}
			</div>
			<ProgressBar
				progress={progress}
				isWarning={isWarning}
				ariaLabel={`Time progress: ${Math.round(progress * 100)}% remaining`}
			/>
		</div>
	)
}
