import { motion } from 'framer-motion'
import {
	answersContainerVariants,
	answerVariants
} from '../../utils/animations.js'

/**
 * Answers component — renders the list of answer buttons with feedback highlighting.
 *
 * @param {Object} props
 * @param {string[]} props.answers - Shuffled answer options
 * @param {string} props.correctAnswer - The correct answer
 * @param {string|null} props.selectedAnswer - The answer the user picked
 * @param {Function} props.onSelect - Called with the answer string when a button is clicked
 * @param {boolean} props.disabled - Disables all buttons during the feedback delay
 * @param {boolean} props.showFeedback - When true, highlights correct/wrong answers
 */
export function Answers({
	answers,
	correctAnswer,
	selectedAnswer,
	onSelect,
	disabled,
	showFeedback
}) {
	return (
		<motion.ul
			id="answers"
			className="answers"
			variants={answersContainerVariants}
			initial="initial"
			animate="animate"
		>
			{answers.map((answer, index) => {
				const isSelected = answer === selectedAnswer
				const isCorrect = answer === correctAnswer
				const showCorrect = showFeedback && isCorrect
				const showWrong = showFeedback && isSelected && !isCorrect

				const buttonClass = [
					'btn-answer',
					isSelected && !showFeedback ? 'selected' : '',
					showCorrect ? 'correct' : '',
					showWrong ? 'wrong' : ''
				]
					.filter(Boolean)
					.join(' ')

				return (
					<motion.li key={answer} className="answer" variants={answerVariants}>
						<button
							className={buttonClass}
							onClick={() => onSelect(answer)}
							disabled={disabled}
							aria-label={`Answer ${index + 1}: ${answer}`}
							aria-pressed={isSelected}
						>
							<span className="answer__hint" aria-hidden="true">
								{index + 1}
							</span>
							<span className="answer__text">{answer}</span>
						</button>
					</motion.li>
				)
			})}
		</motion.ul>
	)
}
