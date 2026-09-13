/**
 * QuestionProgress Component
 *
 * Displays the current question number and total questions in the quiz.
 * Shows progress in "Question X of Y" format with appropriate ARIA attributes
 * for screen reader accessibility.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.current - Current question number (1-based)
 * @param {number} props.total - Total number of questions in the quiz
 * @returns {JSX.Element} Progress indicator element
 *
 * @example
 * <QuestionProgress current={3} total={10} />
 * // Renders: "Question 3 of 10"
 *
 * @requirements 5.1-5.3 - Question Progress Indicator requirements
 */
export function QuestionProgress({ current, total }) {
	return (
		<div
			className="question-progress"
			id="question-overview"
			role="status"
			aria-live="polite"
			aria-atomic="true"
			aria-label={`Question ${current} of ${total}`}
		>
			Question {current} of {total}
		</div>
	)
}
