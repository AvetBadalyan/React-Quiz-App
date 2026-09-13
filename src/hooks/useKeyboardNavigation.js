import { useCallback, useEffect } from 'react'

/**
 * Lets the user pick an answer with the number keys 1–4.
 *
 * @param {Object} options
 * @param {(index: number) => void} options.onSelectAnswer - Called with the 0-based answer index
 * @param {boolean} [options.disabled] - Ignore key presses when true (e.g. during feedback)
 * @param {number}  [options.answerCount] - Number of selectable answers (default 4)
 */
export function useKeyboardNavigation({
	onSelectAnswer,
	disabled = false,
	answerCount = 4
}) {
	const handleKeyDown = useCallback(
		event => {
			if (disabled) return

			const num = Number(event.key)
			if (num >= 1 && num <= answerCount) {
				onSelectAnswer?.(num - 1)
			}
		},
		[disabled, onSelectAnswer, answerCount]
	)

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])
}
