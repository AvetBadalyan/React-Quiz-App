import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuiz } from '../../../context/QuizContext.jsx'
import { useSound } from '../../../context/SoundContext.jsx'
import { DIFFICULTY_CONFIG } from '../../../data/constants.js'
import { useHighScores } from '../../../hooks/useHighScores.js'
import { selectQuestions } from '../../../services/questionService.js'
import { HighScoreDisplay } from '../../feedback/HighScoreDisplay.jsx'
import { AnimatedPage } from '../../layout/AnimatedPage.jsx'
import { Button } from '../../ui/Button.jsx'
import { CategorySelector } from '../CategorySelector.jsx'
import { TopicFilter } from '../TopicFilter.jsx'

/**
 * StartScreen — quiz configuration screen.
 *
 * Lets the user pick a category, difficulty, and optional topic filters
 * before starting a quiz session. TopicFilter handles the insufficient-
 * question warning inline, so we don't need to duplicate it here.
 */
export function StartScreen() {
	const { state, actions, canStartQuiz } = useQuiz()
	const { playClick } = useSound()
	const { getHighScore } = useHighScores()
	const [errorMessage, setErrorMessage] = useState(null)
	const screenRef = useRef(null)

	const { category, difficulty, selectedTopics } = state

	// Focus the container on mount so keyboard users can navigate immediately
	useEffect(() => {
		const id = setTimeout(() => screenRef.current?.focus(), 100)
		return () => clearTimeout(id)
	}, [])

	const highScore =
		category && difficulty ? getHighScore(category, difficulty) : null
	const difficultyConfig = difficulty ? DIFFICULTY_CONFIG[difficulty] : null

	const handleCategorySelect = useCallback(
		categoryId => {
			playClick()
			setErrorMessage(null)
			actions.setCategory(categoryId)
		},
		[actions, playClick]
	)

	const handleDifficultySelect = useCallback(
		difficultyKey => {
			playClick()
			setErrorMessage(null)
			actions.setDifficulty(difficultyKey)
		},
		[actions, playClick]
	)

	const handleTopicsChange = useCallback(
		topics => {
			playClick()
			actions.setTopics(topics)
		},
		[actions, playClick]
	)

	const handleStartQuiz = useCallback(() => {
		if (!canStartQuiz) {
			setErrorMessage(
				'Please select a category and difficulty level before starting.'
			)
			return
		}

		const questions = selectQuestions(
			category,
			difficulty,
			selectedTopics,
			difficultyConfig.questionCount
		)

		if (questions.length === 0) {
			setErrorMessage('No questions available for the selected configuration.')
			return
		}

		playClick()
		actions.startQuiz(questions)
	}, [
		canStartQuiz,
		category,
		difficulty,
		selectedTopics,
		difficultyConfig,
		actions,
		playClick
	])

	const getDifficultyInfo = diffKey => {
		const config = DIFFICULTY_CONFIG[diffKey]
		return {
			label: config.label,
			description: `${config.timerDuration / 1000} seconds, ${config.questionCount} questions`
		}
	}

	const difficulties = Object.keys(DIFFICULTY_CONFIG)

	return (
		<AnimatedPage>
			<div
				className="start-screen"
				ref={screenRef}
				tabIndex={-1}
				aria-label="Quiz configuration screen"
			>
				<h2 className="start-screen__title">Frontend Quiz</h2>
				<p className="start-screen__subtitle">
					Test your knowledge across HTML, CSS, JavaScript, and React
				</p>

				<CategorySelector selected={category} onSelect={handleCategorySelect} />

				<div
					className="difficulty-selector"
					role="group"
					aria-labelledby="difficulty-selector-label"
				>
					<h3 id="difficulty-selector-label">Select Difficulty</h3>
					<div
						className="difficulty-selector__options"
						role="radiogroup"
						aria-label="Difficulty levels"
					>
						{difficulties.map(diffKey => {
							const info = getDifficultyInfo(diffKey)
							const isSelected = difficulty === diffKey
							return (
								<button
									key={diffKey}
									className={`difficulty-selector__option ${isSelected ? 'difficulty-selector__option--selected' : ''}`}
									onClick={() => handleDifficultySelect(diffKey)}
									type="button"
									aria-pressed={isSelected}
									aria-label={`${info.label} difficulty: ${info.description}`}
								>
									<span className="difficulty-selector__label">
										{info.label}
									</span>
									<span className="difficulty-selector__info">
										{info.description}
									</span>
								</button>
							)
						})}
					</div>
				</div>

				{/* TopicFilter renders its own insufficient-questions warning inline */}
				{category && (
					<TopicFilter
						category={category}
						selectedTopics={selectedTopics}
						onTopicsChange={handleTopicsChange}
						difficulty={difficulty}
					/>
				)}

				{category && difficulty && (
					<div className="start-screen__high-score">
						<HighScoreDisplay highScore={highScore} />
					</div>
				)}

				{errorMessage && (
					<div className="start-screen__error" role="alert">
						{errorMessage}
					</div>
				)}

				<div className="start-screen__actions">
					<Button
						variant="primary"
						disabled={!canStartQuiz}
						onClick={handleStartQuiz}
						aria-describedby={!canStartQuiz ? 'start-button-hint' : undefined}
					>
						Start Quiz
					</Button>
					{!canStartQuiz && (
						<p id="start-button-hint" className="start-screen__hint">
							Select both a category and difficulty to start
						</p>
					)}
				</div>
			</div>
		</AnimatedPage>
	)
}
