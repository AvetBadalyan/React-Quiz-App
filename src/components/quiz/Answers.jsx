import { motion } from 'framer-motion'
import { answersContainerVariants, answerVariants } from '../../utils/animations.js'

/**
 * Answers component with animations and feedback
 *
 * Displays answer options with staggered fade-in animations, correct/wrong
 * feedback highlighting, and keyboard shortcut hints. Supports a 2000ms
 * disabled state during feedback to prevent rapid clicking.
 *
 * @param {Object} props
 * @param {string[]} props.answers - Shuffled answer options
 * @param {string} props.correctAnswer - The correct answer (first answer before shuffling)
 * @param {string|null} props.selectedAnswer - Currently selected answer
 * @param {Function} props.onSelect - Handler for answer selection
 * @param {boolean} props.disabled - Whether answers are disabled
 * @param {boolean} props.showFeedback - Whether to show correct/wrong feedback
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
        
        // Show correct highlight when:
        // - Showing feedback AND this is the correct answer
        const showCorrectHighlight = showFeedback && isCorrect
        
        // Show wrong highlight when:
        // - Showing feedback AND this answer is selected AND it's not correct
        const showWrongHighlight = showFeedback && isSelected && !isCorrect

        // Build class names
        const classNames = ['answer']
        if (isSelected && !showFeedback) classNames.push('selected')
        if (showCorrectHighlight) classNames.push('correct')
        if (showWrongHighlight) classNames.push('wrong')

        return (
          <motion.li
            key={answer}
            className={classNames.join(' ')}
            variants={answerVariants}
          >
            <button
              className={`btn-answer ${isSelected && !showFeedback ? 'selected' : ''} ${showCorrectHighlight ? 'correct' : ''} ${showWrongHighlight ? 'wrong' : ''}`}
              onClick={() => onSelect(answer)}
              disabled={disabled}
              aria-label={`Answer ${index + 1}: ${answer}`}
              aria-pressed={isSelected}
            >
              <span className="answer__hint" aria-hidden="true">{index + 1}</span>
              <span className="answer__text">{answer}</span>
            </button>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

export default Answers
