import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Countdown timer hook for quiz questions.
 *
 * @param {number} duration - Total time in milliseconds
 * @param {Object} options
 * @param {Function} [options.onTimeout]        - Called once when the timer reaches 0
 * @param {Function} [options.onWarning]        - Called once when the timer enters warning zone
 * @param {number}   [options.warningThreshold] - ms threshold that triggers warning (default 5000)
 * @param {boolean}  [options.isPaused]         - Pauses the countdown when true (default false)
 *
 * @returns {{ timeRemaining: number, isWarning: boolean, progress: number, reset: Function }}
 */
export function useTimer(duration, options = {}) {
	const {
		onTimeout,
		onWarning,
		warningThreshold = 5000,
		isPaused = false
	} = options

	const [timeRemaining, setTimeRemaining] = useState(duration)

	// Stable refs so callbacks never cause the countdown interval to restart
	const onTimeoutRef = useRef(onTimeout)
	const onWarningRef = useRef(onWarning)
	const warningTriggeredRef = useRef(false)
	const timeoutTriggeredRef = useRef(false)

	// Keep refs up to date without restarting the interval
	onTimeoutRef.current = onTimeout
	onWarningRef.current = onWarning

	// A 100ms buffer makes isWarning true slightly before the exact threshold,
	// preventing a one-tick flicker where the warning state is missed.
	const BUFFER = 100
	const isWarning =
		timeRemaining <= warningThreshold + BUFFER && timeRemaining > 0
	const progress = duration > 0 ? timeRemaining / duration : 0

	// Reset to full duration (also resets the one-shot callback guards)
	const reset = useCallback(() => {
		setTimeRemaining(duration)
		warningTriggeredRef.current = false
		timeoutTriggeredRef.current = false
	}, [duration])

	// Reset when the question changes (new duration prop)
	useEffect(() => {
		setTimeRemaining(duration)
		warningTriggeredRef.current = false
		timeoutTriggeredRef.current = false
	}, [duration])

	// Countdown — ticks every 100 ms for a smooth progress bar
	useEffect(() => {
		if (isPaused) return
		const id = setInterval(() => {
			setTimeRemaining(prev => (prev <= 100 ? 0 : prev - 100))
		}, 100)
		return () => clearInterval(id)
	}, [isPaused])

	// Fire warning and timeout callbacks exactly once each
	useEffect(() => {
		if (isPaused) return

		if (isWarning && !warningTriggeredRef.current) {
			warningTriggeredRef.current = true
			onWarningRef.current?.()
		}

		if (timeRemaining === 0 && !timeoutTriggeredRef.current) {
			timeoutTriggeredRef.current = true
			onTimeoutRef.current?.()
		}
	}, [timeRemaining, isPaused, isWarning])

	return { timeRemaining, isWarning, progress, reset }
}
