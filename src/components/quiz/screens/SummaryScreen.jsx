import { useEffect, useMemo, useRef, useState } from 'react'
import quizCompleteImg from '../../../assets/quiz-complete.png'
import { useQuiz } from '../../../context/QuizContext.jsx'
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '../../../data/constants.js'
import { useHighScores } from '../../../hooks/useHighScores.js'
import { calculatePercentages, calculateScore } from '../../../utils/scoring.js'
import { Confetti } from '../../feedback/Confetti.jsx'
import { HighScoreDisplay } from '../../feedback/HighScoreDisplay.jsx'
import { NewRecordBadge } from '../../feedback/NewRecordBadge.jsx'
import { AnimatedPage } from '../../layout/AnimatedPage.jsx'
import { Button } from '../../ui/Button.jsx'

/**
 * SummaryScreen component displays quiz results after completion
 *
 * Features:
 * - Display statistics (correct, wrong, skipped percentages)
 * - Question-by-question breakdown showing user answers
 * - High score display with new record indicator
 * - Confetti celebration for new high scores
 * - Restart Quiz button to return to Start Screen
 * - Focus management for keyboard accessibility
 *
 * @returns {JSX.Element} Summary screen with quiz results
 *
 * @requirements 6.1-6.3, 7.8, 8.4-8.6, 11.1-11.5, 12.1-12.5 (Keyboard accessibility)
 */
export function SummaryScreen() {
	const { state, actions, correctCount, totalQuestions } = useQuiz()
	const { getHighScore, checkAndSaveHighScore, lastSaveResult } =
		useHighScores()
	const [isNewRecord, setIsNewRecord] = useState(false)
	const [highScore, setHighScore] = useState(null)
	const screenRef = useRef(null)

	// Focus management: focus the screen container when mounted for keyboard users
	useEffect(() => {
		const timer = setTimeout(() => {
			screenRef.current?.focus()
		}, 300) // Slight delay to allow animation to start
		return () => clearTimeout(timer)
	}, [])

	// Calculate results from quiz state
	const results = useMemo(() => {
		const correct = state.userAnswers.filter(a => a.isCorrect).length
		const skipped = state.userAnswers.filter(
			a => a.selectedAnswer === null
		).length
		const wrong = state.userAnswers.length - correct - skipped

		return { correct, wrong, skipped }
	}, [state.userAnswers])

	// Calculate percentages
	const percentages = useMemo(() => {
		return calculatePercentages(results)
	}, [results])

	// Calculate score
	const score = useMemo(() => {
		return calculateScore(results.correct, state.userAnswers.length)
	}, [results.correct, state.userAnswers.length])

	// Calculate time taken
	const timeTaken = useMemo(() => {
		if (!state.startTime || !state.endTime) return null
		const seconds = Math.round((state.endTime - state.startTime) / 1000)
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${seconds}s`
	}, [state.startTime, state.endTime])

	// Check and save high score on mount
	useEffect(() => {
		if (state.category && state.difficulty && state.userAnswers.length > 0) {
			const newRecord = checkAndSaveHighScore(
				state.category,
				state.difficulty,
				results.correct,
				state.userAnswers.length
			)
			setIsNewRecord(newRecord)

			// Get updated high score after potential save
			const currentHighScore = getHighScore(state.category, state.difficulty)
			setHighScore(currentHighScore)
		}
	}, [
		state.category,
		state.difficulty,
		state.userAnswers.length,
		results.correct,
		checkAndSaveHighScore,
		getHighScore
	])

	// Get category and difficulty labels
	const categoryLabel = CATEGORY_CONFIG[state.category]?.label || state.category
	const difficultyLabel =
		DIFFICULTY_CONFIG[state.difficulty]?.label || state.difficulty

	// Handle restart quiz
	const handleRestart = () => {
		actions.resetQuiz()
	}

	// Get CSS class for user answer
	const getAnswerClass = userAnswer => {
		if (userAnswer.selectedAnswer === null) {
			return 'user-answer skipped'
		}
		return userAnswer.isCorrect ? 'user-answer correct' : 'user-answer wrong'
	}

	return (
		<AnimatedPage>
			{/* Trigger confetti for new high scores */}
			{isNewRecord && <Confetti trigger={true} />}

			<div
				id="summary"
				className="summary-screen"
				role="main"
				aria-labelledby="summary-title"
				ref={screenRef}
				tabIndex={-1}
			>
				<img
					src={quizCompleteImg}
					alt=""
					aria-hidden="true"
				/>
				<h2 id="summary-title">Quiz Completed!</h2>

				{/* Category and difficulty info */}
				<div
					className="summary-screen__meta"
					aria-label={`${categoryLabel} quiz on ${difficultyLabel} difficulty${timeTaken ? `, completed in ${timeTaken}` : ''}`}
				>
					<span className="summary-screen__category">{categoryLabel}</span>
					<span
						className="summary-screen__separator"
						aria-hidden="true"
					>
						•
					</span>
					<span className="summary-screen__difficulty">{difficultyLabel}</span>
					{timeTaken && (
						<>
							<span
								className="summary-screen__separator"
								aria-hidden="true"
							>
								•
							</span>
							<span className="summary-screen__time">{timeTaken}</span>
						</>
					)}
				</div>

				{/* New record badge */}
				{isNewRecord && <NewRecordBadge />}

				{/* Statistics */}
				<div
					id="summary-stats"
					role="region"
					aria-label="Quiz statistics"
				>
					<p>
						<span className="number">{percentages.skipped}%</span>
						<span className="text">skipped</span>
					</p>
					<p>
						<span className="number">{percentages.correct}%</span>
						<span className="text">answered correctly</span>
					</p>
					<p>
						<span className="number">{percentages.wrong}%</span>
						<span className="text">answered incorrectly</span>
					</p>
				</div>

				{/* Score display */}
				<div
					className="summary-screen__score"
					role="status"
					aria-live="polite"
					aria-label={`Your score: ${score}%, ${results.correct} of ${state.userAnswers.length} correct`}
				>
					<span className="summary-screen__score-label">Your Score</span>
					<span className="summary-screen__score-value">{score}%</span>
					<span className="summary-screen__score-detail">
						{results.correct} of {state.userAnswers.length} correct
					</span>
				</div>

				{/* High score display */}
				<div className="summary-screen__high-score">
					<HighScoreDisplay highScore={highScore} />
				</div>

				{/* Question-by-question breakdown */}
				<ol
					className="summary-screen__questions"
					aria-label="Question breakdown"
				>
					{state.userAnswers.map((userAnswer, index) => {
						const question = state.questions[index]
						if (!question) return null

						return (
							<li key={userAnswer.questionId || index}>
								<h3>{index + 1}</h3>
								<p className="question">{question.text}</p>
								<p className={getAnswerClass(userAnswer)}>
									{userAnswer.selectedAnswer ?? 'Skipped'}
								</p>
								{/* Show correct answer if wrong or skipped */}
								{!userAnswer.isCorrect && (
									<p className="correct-answer">
										Correct: {question.answers[0]}
									</p>
								)}
							</li>
						)
					})}
				</ol>

				{/* Restart button */}
				<div className="summary-screen__actions">
					<Button
						variant="primary"
						onClick={handleRestart}
						aria-label="Restart quiz and return to start screen"
					>
						Restart Quiz
					</Button>
				</div>
			</div>
		</AnimatedPage>
	)
}
