import confetti from 'canvas-confetti'
import { useEffect } from 'react'

// Confetti palette — mirrors the SCSS theme tokens ($color-primary/violet,
// $color-success, $color-warning, $color-danger). Kept here because JS
// cannot read SCSS variables.
const CONFETTI_COLORS = ['#9e5ef8', '#5af59d', '#f5a76c', '#f55a98']

/**
 * Confetti celebration component
 * Triggers confetti animation when rendered and trigger is true
 *
 * @param {Object} props
 * @param {boolean} props.trigger - Whether to fire confetti (default: true)
 * @returns {null} This component renders nothing
 */
export function Confetti({ trigger = true }) {
	useEffect(() => {
		if (!trigger) return

		try {
			// Fire for 3–5 seconds
			const duration = 3000 + Math.random() * 2000
			const animationEnd = Date.now() + duration

			const frame = () => {
				// Fire confetti from left side
				confetti({
					particleCount: 3,
					angle: 60,
					spread: 55,
					origin: { x: 0 },
					colors: CONFETTI_COLORS
				})

				// Fire confetti from right side
				confetti({
					particleCount: 3,
					angle: 120,
					spread: 55,
					origin: { x: 1 },
					colors: CONFETTI_COLORS
				})

				// Continue animation until duration expires
				if (Date.now() < animationEnd) {
					requestAnimationFrame(frame)
				}
			}

			frame()
		} catch (error) {
			// Graceful fallback - log warning but don't crash the app
			// The Summary screen will display the new record badge as alternative celebration
			console.warn('Confetti animation failed:', error)
		}
	}, [trigger])

	// Component renders nothing - confetti draws on its own canvas
	return null
}
