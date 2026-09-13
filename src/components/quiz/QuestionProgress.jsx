/**
 * Displays the current question number out of the total.
 *
 * @param {Object} props
 * @param {number} props.current - Current question number (1-based)
 * @param {number} props.total - Total questions in this quiz
 */
export function QuestionProgress({ current, total }) {
	return (
		<div
			className="question-progress"
			role="status"
			aria-live="polite"
			aria-atomic="true"
			aria-label={`Question ${current} of ${total}`}
		>
			Question {current} of {total}
		</div>
	)
}
