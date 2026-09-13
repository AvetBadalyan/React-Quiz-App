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

// How long (ms) feedback colours are shown before moving to the next question
const FEEDBACK_DELAY = 2000

/**
 * QuizScreen — the active quiz session view.
 *
 * Handles answer selection → feedback display → question progression.
 * Keyboard shortcuts: press 1–4 to select an answer.
 */
export function QuizScreen() {
	const { state, actions, currentQuestion, totalQuestions } = useQuiz()
	const { playCorrect, playWrong } = useSound()

	const [showFeedback, setShowFeedback] = useState(false)
	const [selectedAnswer, setSelectedAnswer] = useState(null)

	const questionStartTime = useRef(Date.now())
	const feedbackTimerRef = useRef(null)
	const screenRef = useRef(null)

	// Shuffle answers once per question (not on every render)
	const shuffledAnswers = useMemo(() => {
		if (!currentQuestion) return []
		return shuffle(currentQuestion.answers)
	}, [currentQuestion?.id]) // eslint-disable-line react-hooks/exhaustive-deps

	const timerDuration =
		DIFFICULTY_CONFIG[state.difficulty]?.timerDuration ?? 20000
	const correctAnswer = currentQuestion?.answers[0]

	// Focus the container on mount so keyboard navigation works immediately
	useEffect(() => {
		const id = setTimeout(() => screenRef.current?.focus(), 100)
		return () => clearTimeout(id)
	}, [])

	// Reset local state and clear any pending timer when the question changes
	useEffect(() => {
		setSelectedAnswer(null)
		setShowFeedback(false)
		questionStartTime.current = Date.now()

		return () => clearTimeout(feedbackTimerRef.current)
	}, [currentQuestion?.id])

	const advanceAfterFeedback = useCallback(() => {
		feedbackTimerRef.current = setTimeout(() => {
			actions.nextQuestion()
			setSelectedAnswer(null)
			setShowFeedback(false)
			questionStartTime.current = Date.now()
		}, FEEDBACK_DELAY)
	}, [actions])

	const handleSelectAnswer = useCallback(
		answer => {
			if (showFeedback || !currentQuestion) return

			const timeSpent = Date.now() - questionStartTime.current
			answer === correctAnswer ? playCorrect() : playWrong()

			actions.confirmAnswer(answer, timeSpent)
			setSelectedAnswer(answer)
			setShowFeedback(true)
			advanceAfterFeedback()
		},
		[
			showFeedback,
			currentQuestion,
			correctAnswer,
			actions,
			playCorrect,
			playWrong,
			advanceAfterFeedback
		]
	)

	const handleTimeout = useCallback(() => {
		if (showFeedback || !currentQuestion) return

		const timeSpent = Date.now() - questionStartTime.current
		actions.skipQuestion(timeSpent)
		setSelectedAnswer(null)
		setShowFeedback(true)
		advanceAfterFeedback()
	}, [showFeedback, currentQuestion, actions, advanceAfterFeedback])

	// Keys 1–4 select the corresponding shuffled answer
	useKeyboardNavigation({
		onSelectAnswer: index => {
			if (index >= 0 && index < shuffledAnswers.length) {
				handleSelectAnswer(shuffledAnswers[index])
			}
		},
		disabled: showFeedback,
		answerCount: shuffledAnswers.length
	})

	if (!currentQuestion) return null

	return (
		<AnimatedPage>
			<div
				className="quiz-screen"
				ref={screenRef}
				tabIndex={-1}
				role="region"
				aria-label="Quiz question screen"
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
						<QuestionProgress
							current={state.currentQuestionIndex + 1}
							total={totalQuestions}
						/>

						<QuestionTimer
							key={`timer-${currentQuestion.id}`}
							duration={timerDuration}
							onTimeout={handleTimeout}
							isPaused={showFeedback}
						/>

						<h2 className="question__text" id="question-text">
							{currentQuestion.text}
						</h2>

						{currentQuestion.codeBlock && (
							<pre className="question__code">
								<code>{currentQuestion.codeBlock}</code>
							</pre>
						)}

						<Answers
							answers={shuffledAnswers}
							correctAnswer={correctAnswer}
							selectedAnswer={selectedAnswer}
							onSelect={handleSelectAnswer}
							disabled={showFeedback}
							showFeedback={showFeedback}
						/>

						{/* Screen reader hint for keyboard shortcuts */}
						<p className="sr-only" aria-live="polite">
							Press keys 1 through {shuffledAnswers.length} to select an answer
						</p>

						{/* Screen reader feedback announcement */}
						{showFeedback && (
							<div className="sr-only" role="status" aria-live="assertive">
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
