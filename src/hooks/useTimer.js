/**
 * useTimer Hook
 *
 * Countdown timer hook with warning state detection and pause functionality.
 * Designed for quiz question timing with visual feedback triggers.
 *
 * Features:
 * - Countdown timer with configurable duration
 * - Warning state detection at configurable threshold
 * - Pause functionality during answer feedback
 * - Callback triggers for timeout and warning events
 * - Progress calculation for visual representation
 *
 * Validates: Requirements 3.1-3.3, 13.1-13.5
 */

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Timer hook for quiz questions
 *
 * @param {number} duration - Total time in milliseconds
 * @param {Object} options - Timer configuration options
 * @param {Function} options.onTimeout - Callback when timer reaches 0
 * @param {Function} options.onWarning - Callback when timer enters warning zone
 * @param {number} options.warningThreshold - Time in ms to trigger warning (default 5000)
 * @param {boolean} options.isPaused - Whether timer should pause
 * @returns {Object} Timer state and controls
 *
 * @example
 * const { timeRemaining, isWarning, progress, reset } = useTimer(30000, {
 *   onTimeout: handleTimeout,
 *   onWarning: handleWarning,
 *   warningThreshold: 5000,
 *   isPaused: false
 * })
 */
export function useTimer(duration, options = {}) {
  const {
    onTimeout,
    onWarning,
    warningThreshold = 5000,
    isPaused = false
  } = options

  // State for tracking time remaining
  const [timeRemaining, setTimeRemaining] = useState(duration)

  // Track if warning has been triggered to prevent multiple calls
  // Using a ref to persist across renders without causing re-renders
  const warningTriggeredRef = useRef(false)

  // Track if timeout has been triggered
  const timeoutTriggeredRef = useRef(false)

  // Store callbacks in refs to avoid unnecessary effect re-runs
  const onTimeoutRef = useRef(onTimeout)
  const onWarningRef = useRef(onWarning)

  // Update callback refs when they change
  useEffect(() => {
    onTimeoutRef.current = onTimeout
  }, [onTimeout])

  useEffect(() => {
    onWarningRef.current = onWarning
  }, [onWarning])

  // Calculate derived values
  // Using a buffer of ~5100ms to prevent rapid state changes near the threshold
  // as specified in Requirements 13.5
  const BUFFER = 100
  const isWarning = timeRemaining <= warningThreshold + BUFFER && timeRemaining > 0

  // Progress: 0 means full time elapsed, 1 means full time remaining
  // This represents percentage of time remaining
  const progress = duration > 0 ? timeRemaining / duration : 0

  /**
   * Reset timer to full duration
   * Resets warning and timeout triggers
   */
  const reset = useCallback(() => {
    setTimeRemaining(duration)
    warningTriggeredRef.current = false
    timeoutTriggeredRef.current = false
  }, [duration])

  // Main countdown timer effect
  useEffect(() => {
    // Don't run if paused
    if (isPaused) {
      return
    }

    // Set up interval for countdown (100ms for smooth progress bar)
    const intervalId = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 100

        // Prevent going below 0
        if (newTime <= 0) {
          return 0
        }

        return newTime
      })
    }, 100)

    return () => {
      clearInterval(intervalId)
    }
  }, [isPaused])

  // Warning trigger effect
  useEffect(() => {
    // Check if we should trigger warning callback
    // Only trigger once when entering warning zone
    if (
      isWarning &&
      !warningTriggeredRef.current &&
      !isPaused &&
      onWarningRef.current
    ) {
      warningTriggeredRef.current = true
      onWarningRef.current()
    }
  }, [isWarning, isPaused])

  // Timeout trigger effect
  useEffect(() => {
    // Check if timer has reached 0
    if (
      timeRemaining <= 0 &&
      !timeoutTriggeredRef.current &&
      !isPaused &&
      onTimeoutRef.current
    ) {
      timeoutTriggeredRef.current = true
      onTimeoutRef.current()
    }
  }, [timeRemaining, isPaused])

  // Reset timer when duration changes (new question)
  useEffect(() => {
    setTimeRemaining(duration)
    warningTriggeredRef.current = false
    timeoutTriggeredRef.current = false
  }, [duration])

  return {
    /** Time remaining in milliseconds */
    timeRemaining,
    /** Whether timer is in warning state (timeRemaining <= warningThreshold) */
    isWarning,
    /** Progress as a fraction (0-1, percentage of time remaining) */
    progress,
    /** Reset timer to full duration */
    reset
  }
}
