/**
 * QuizScreen Component
 *
 * Displays the active quiz session with questions, timer, progress, and answer options.
 * Features:
 * - Current question display with timer
 * - Answer selection with correct/wrong feedback
 * - Keyboard navigation (1-4 for answers, Enter to confirm)
 * - Sound effects on answer selection
 * - 2000ms feedback delay before advancing to next question
 * - Focus management for keyboard accessibility
 *
 * Validates: Requirements 2.3, 4.1-4.5, 7.2, 7.3, 10.3, 10.4, 12.1-12.5
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuiz } from '../../../context/QuizContext.jsx'
import { useSound } from '../../../context/SoundContext.jsx'
import { DIFFICULTY_CONFIG } from '../../../data/constants.js'
import { useKeyboardNavigation } from '../../../hooks/useKeyboardNavigation.js'
import { questionVariants } from '../../../utils/animations.js'
import { shuffle } from '../../../utils/shuffle.js'
import { AnimatedPage } from '../../layout/AnimatedPage.jsx'
import { Answers } from '../Answers.jsx'
import { QuestionProgress } from '../QuestionProgress.jsx'
import { QuestionTimer } from '../QuestionTimer.jsx'

// Feedback display duration before advancing to next question
const FEEDBACK_DELAY = 2000

/**
 * QuizScreen - Active quiz session view
 *
 * Responsibilities:
 * - Display current question with timer
 * - Handle answer selection with feedback
 * - Manage question progression
 * - Integrate keyboard navigation
 * - Play correct/wrong sounds on answer
 * - Manage focus for keyboard accessibility
 */
export function QuizScreen() {
	const { state, actions, currentQuestion, totalQuestions } = useQuiz()
	const { playCorrect, playWrong } = useSound()

	// Track selected answer before confirmation
	const [selectedAnswer, setSelectedAnswer] = useState(null)
	// Track if showing feedback (during the 2000ms delay)
	const [showFeedback, setShowFeedback] = useState(false)
	// Track time spent on current question
	const questionStartTime = useRef(Date.now())
	// Timer for advancing to next question
	const feedbackTimerRef = useRef(null)
	// Screen ref for focus management
	const screenRef = useRef(null)

	// Memoize shuffled answers for the current question
	const shuffledAnswers = useMemo(() => {
		if (!currentQuestion) return []
		return shuffle(currentQuestion.answers)
	}, [currentQuestion?.id])

	// Get timer duration based on difficulty
	const timerDuration =
		DIFFICULTY_CONFIG[state.difficulty]?.timerDuration || 20000

	// Get the correct answer (first answer in the original array)
	const correctAnswer = currentQuestion?.answers[0]

	// Determine if answers should be disabled (during feedback or after answering)
	const answersDisabled = showFeedback

	// Focus management: focus the screen container when mounted for keyboard users
	useEffect(() => {
		const timer = setTimeout(() => {
			screenRef.current?.focus()
		}, 100)
		return () => clearTimeout(timer)
	}, [])

	/**
	 * Handle answer confirmation and show feedback
	 */
	const confirmAnswer = useCallback(
		answer => {
			if (showFeedback || !currentQuestion) return

			const timeSpent = Date.now() - questionStartTime.current
			const isCorrect = answer === correctAnswer

			// Play appropriate sound
			// Validates: Requirements 10.3, 10.4
			if (isCorrect) {
				playCorrect()
			} else {
				playWrong()
			}

			// Record the answer
			actions.confirmAnswer(answer, timeSpent)
			setShowFeedback(true)

			// Advance to next question after feedback delay
			// Validates: Requirement 4.5 - 2000ms before advancing
			feedbackTimerRef.current = setTimeout(() => {
				actions.nextQuestion()
				setSelectedAnswer(null)
				setShowFeedback(false)
				questionStartTime.current = Date.now()
			}, FEEDBACK_DELAY)
		},
		[
			showFeedback,
			currentQuestion,
			correctAnswer,
			actions,
			playCorrect,
			playWrong
		]
	)

	/**
	 * Handle answer selection (before confirmation)
	 */
	const handleSelectAnswer = useCallback(
		answer => {
			if (showFeedback) return
			setSelectedAnswer(answer)
			// Immediately confirm the answer (no separate confirm step in the current flow)
			confirmAnswer(answer)
		},
		[showFeedback, confirmAnswer]
	)

	/**
	 * Handle keyboard selection by index
	 * Validates: Requirements 12.1, 12.2
	 */
	const handleKeyboardSelect = useCallback(
		index => {
			if (index >= 0 && index < shuffledAnswers.length) {
				handleSelectAnswer(shuffledAnswers[index])
			}
		},
		[shuffledAnswers, handleSelectAnswer]
	)

	/**
	 * Handle timer timeout - skip the question
	 * Validates: Requirement 4.4 - show correct answer when user skips
	 */
	const handleTimeout = useCallback(() => {
		if (showFeedback || !currentQuestion) return

		const timeSpent = Date.now() - questionStartTime.current
		actions.skipQuestion(timeSpent)
		setSelectedAnswer(null)
		setShowFeedback(true)

		// Advance to next question after feedback delay
		feedbackTimerRef.current = setTimeout(() => {
			actions.nextQuestion()
			setSelectedAnswer(null)
			setShowFeedback(false)
			questionStartTime.current = Date.now()
		}, FEEDBACK_DELAY)
	}, [showFeedback, currentQuestion, actions])

	// Keyboard navigation
	// Validates: Requirements 12.1-12.5
	useKeyboardNavigation({
		onSelectAnswer: handleKeyboardSelect,
		onConfirm: () => {}, // Not used since we auto-confirm on selection
		disabled: answersDisabled,
		answerCount: shuffledAnswers.length
	})

	// Reset state when question changes
	useEffect(() => {
		setSelectedAnswer(null)
		setShowFeedback(false)
		questionStartTime.current = Date.now()

		return () => {
			// Clear any pending feedback timer on unmount or question change
			if (feedbackTimerRef.current) {
				clearTimeout(feedbackTimerRef.current)
			}
		}
	}, [currentQuestion?.id])

	// Clear timer on unmount
	useEffect(() => {
		return () => {
			if (feedbackTimerRef.current) {
				clearTimeout(feedbackTimerRef.current)
			}
		}
	}, [])

	// Don't render if no current question
	if (!currentQuestion) {
		return null
	}

	return (
		<AnimatedPage>
			<div
				className="quiz-screen"
				ref={screenRef}
				tabIndex={-1}
				aria-label="Quiz question screen"
				role="region"
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestion.id}
						className="question"
						variants={questionVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						role="article"
						aria-label={`Question ${state.currentQuestionIndex + 1} of ${totalQuestions}`}
					>
						{/* Progress indicator */}
						<QuestionProgress
							current={state.currentQuestionIndex + 1}
							total={totalQuestions}
						/>

						{/* Timer */}
						<QuestionTimer
							key={`timer-${currentQuestion.id}`}
							duration={timerDuration}
							onTimeout={handleTimeout}
							isPaused={showFeedback}
						/>

						{/* Question text */}
						<h2
							className="question__text"
							id="question-text"
						>
							{currentQuestion.text}
						</h2>

						{/* Answer options */}
						<Answers
							answers={shuffledAnswers}
							correctAnswer={correctAnswer}
							selectedAnswer={selectedAnswer}
							onSelect={handleSelectAnswer}
							disabled={answersDisabled}
							showFeedback={showFeedback}
						/>

						{/* Screen reader announcement for keyboard shortcuts */}
						<p
							className="sr-only"
							aria-live="polite"
						>
							Press keys 1 through {shuffledAnswers.length} to select an answer
						</p>

						{/* Screen reader announcement for answer feedback */}
						{showFeedback && (
							<div
								className="sr-only"
								role="status"
								aria-live="assertive"
							>
								{selectedAnswer === correctAnswer
									? 'Correct answer!'
									: selectedAnswer === null
										? `Time expired. The correct answer was: ${correctAnswer}`
										: `Incorrect. The correct answer was: ${correctAnswer}`}
							</div>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</AnimatedPage>
	)
}

export default QuizScreen
