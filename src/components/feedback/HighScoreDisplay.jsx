/**
 * High score display component
 * Shows the high score for a specific category/difficulty combination
 *
 * @param {Object} props
 * @param {Object|null} props.highScore - High score entry { score, correctCount, totalCount }
 * @returns {JSX.Element} High score display element
 */
export function HighScoreDisplay({ highScore }) {
	if (!highScore) {
		return (
			<div
				className="high-score-display"
				role="status"
				aria-label="No high score recorded yet"
			>
				<span className="high-score-display__label">High Score</span>
				<span className="high-score-display__value">No high score yet</span>
			</div>
		)
	}

	return (
		<div
			className="high-score-display"
			role="status"
			aria-label={`High score: ${highScore.score} percent`}
		>
			<span className="high-score-display__label">High Score</span>
			<span className="high-score-display__value">{highScore.score}%</span>
		</div>
	)
}
