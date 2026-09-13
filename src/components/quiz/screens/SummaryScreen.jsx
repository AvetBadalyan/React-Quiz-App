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
 * SummaryScreen — displayed after the quiz completes.
 *
 * Shows score, per-category stats, a question-by-question breakdown,
 * and the all-time high score. Triggers confetti on a new record.
 */
export function SummaryScreen() {
	const { state, actions, correctCount } = useQuiz()
	const { getHighScore, checkAndSaveHighScore } = useHighScores()

	const [isNewRecord, setIsNewRecord] = useState(false)
	const [highScore, setHighScore] = useState(null)
	const screenRef = useRef(null)

	// Focus the container on mount so keyboard users land in the right place
	useEffect(() => {
		const id = setTimeout(() => screenRef.current?.focus(), 300)
		return () => clearTimeout(id)
	}, [])

	// Save the score once and update the high score display
	useEffect(() => {
		if (!state.category || !state.difficulty || state.userAnswers.length === 0)
			return

		const newRecord = checkAndSaveHighScore(
			state.category,
			state.difficulty,
			correctCount,
			state.userAnswers.length
		)
		setIsNewRecord(newRecord)
		setHighScore(getHighScore(state.category, state.difficulty))
		// Intentionally runs once on mount to save the score a single time.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const totalAnswers = state.userAnswers.length

	const skippedCount = useMemo(
		() => state.userAnswers.filter(a => a.selectedAnswer === null).length,
		[state.userAnswers]
	)
	const wrongCount = totalAnswers - correctCount - skippedCount

	const percentages = useMemo(
		() =>
			calculatePercentages({
				correct: correctCount,
				wrong: wrongCount,
				skipped: skippedCount
			}),
		[correctCount, wrongCount, skippedCount]
	)

	const score = useMemo(
		() => calculateScore(correctCount, totalAnswers),
		[correctCount, totalAnswers]
	)

	const timeTaken = useMemo(() => {
		if (!state.startTime || !state.endTime) return null
		const seconds = Math.round((state.endTime - state.startTime) / 1000)
		const m = Math.floor(seconds / 60)
		const s = seconds % 60
		return m > 0 ? `${m}m ${s}s` : `${seconds}s`
	}, [state.startTime, state.endTime])

	const categoryLabel = CATEGORY_CONFIG[state.category]?.label || state.category
	const difficultyLabel =
		DIFFICULTY_CONFIG[state.difficulty]?.label || state.difficulty

	const getAnswerClass = userAnswer => {
		if (userAnswer.selectedAnswer === null) return 'user-answer skipped'
		return userAnswer.isCorrect ? 'user-answer correct' : 'user-answer wrong'
	}

	return (
		<AnimatedPage>
			{isNewRecord && <Confetti trigger />}

			<div
				id="summary"
				className="summary-screen"
				role="main"
				aria-labelledby="summary-title"
				ref={screenRef}
				tabIndex={-1}
			>
				<img src={quizCompleteImg} alt="" aria-hidden="true" />
				<h2 id="summary-title">Quiz Completed!</h2>

				<div
					className="summary-screen__meta"
					aria-label={`${categoryLabel} quiz, ${difficultyLabel} difficulty${timeTaken ? `, completed in ${timeTaken}` : ''}`}
				>
					<span className="summary-screen__category">{categoryLabel}</span>
					<span className="summary-screen__separator" aria-hidden="true">
						•
					</span>
					<span className="summary-screen__difficulty">{difficultyLabel}</span>
					{timeTaken && (
						<>
							<span className="summary-screen__separator" aria-hidden="true">
								•
							</span>
							<span className="summary-screen__time">{timeTaken}</span>
						</>
					)}
				</div>

				{isNewRecord && <NewRecordBadge />}

				<div id="summary-stats" role="region" aria-label="Quiz statistics">
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

				<div
					className="summary-screen__score"
					role="status"
					aria-label={`Your score: ${score}%, ${correctCount} of ${totalAnswers} correct`}
				>
					<span className="summary-screen__score-label">Your Score</span>
					<span className="summary-screen__score-value">{score}%</span>
					<span className="summary-screen__score-detail">
						{correctCount} of {totalAnswers} correct
					</span>
				</div>

				<div className="summary-screen__high-score">
					<HighScoreDisplay highScore={highScore} />
				</div>

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
								{!userAnswer.isCorrect && (
									<p className="correct-answer">
										Correct: {question.answers[0]}
									</p>
								)}
							</li>
						)
					})}
				</ol>

				<div className="summary-screen__actions">
					<Button
						variant="primary"
						onClick={actions.playAgain}
						aria-label={`Try the ${categoryLabel} ${difficultyLabel} quiz again`}
					>
						Try Again
					</Button>
					<Button
						variant="secondary"
						onClick={actions.resetQuiz}
						aria-label="Choose a different category and difficulty"
					>
						New Quiz
					</Button>
				</div>
			</div>
		</AnimatedPage>
	)
}
