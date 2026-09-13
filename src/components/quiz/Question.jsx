/**
 * Question display component
 *
 * Displays a quiz question with:
 * - Slide-in animation using Framer Motion
 * - Integrated timer, progress, and answer components
 * - Support for feedback highlighting
 *
 * Validates: Requirements 7.3
 */

import { motion, AnimatePresence } from 'framer-motion'
import { questionVariants } from '../../utils/animations.js'
import { QuestionTimer } from './QuestionTimer.jsx'
import { QuestionProgress } from './QuestionProgress.jsx'
import Answers from '../Answers.jsx'

/**
 * Question display component
 * @param {Object} props
 * @param {Object} props.question - Question object with text and answers
 * @param {number} props.questionIndex - Current question index (0-based)
 * @param {number} props.totalQuestions - Total questions
 * @param {number} props.timerDuration - Timer duration in ms
 * @param {string|null} props.selectedAnswer - Selected answer
 * @param {boolean} props.showFeedback - Whether to show feedback
 * @param {Function} props.onSelectAnswer - Answer selection handler
 * @param {Function} props.onTimeout - Timer timeout handler
 */
export function Question({
  question,
  questionIndex,
  totalQuestions,
  timerDuration,
  selectedAnswer,
  showFeedback,
  onSelectAnswer,
  onTimeout
}) {
  // Shuffled answers (stored in question.shuffledAnswers if pre-shuffled, otherwise question.answers)
  const shuffledAnswers = question.shuffledAnswers || question.answers

  // Determine answer state for styling
  let answerState = ''
  if (showFeedback && selectedAnswer) {
    const isCorrect = selectedAnswer === question.answers[0]
    answerState = isCorrect ? 'correct' : 'wrong'
  } else if (selectedAnswer) {
    answerState = 'answered'
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        className="question"
        variants={questionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <QuestionProgress current={questionIndex + 1} total={totalQuestions} />
        <QuestionTimer
          duration={timerDuration}
          onTimeout={onTimeout}
          isPaused={showFeedback}
        />
        <h2 className="question__text">{question.text}</h2>
        <Answers
          answers={shuffledAnswers}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
          onSelect={onSelectAnswer}
        />
      </motion.div>
    </AnimatePresence>
  )
}
