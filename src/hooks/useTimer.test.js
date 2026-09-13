/**
 * Unit tests for useTimer hook
 *
 * Tests the countdown timer functionality including:
 * - Basic countdown behavior
 * - Warning state detection
 * - Pause functionality
 * - Callback triggers
 * - Reset functionality
 */

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTimer } from './useTimer'

describe('useTimer', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	describe('initialization', () => {
		it('should initialize with full duration', () => {
			const { result } = renderHook(() => useTimer(30000))

			expect(result.current.timeRemaining).toBe(30000)
			expect(result.current.isWarning).toBe(false)
			expect(result.current.progress).toBe(1)
		})

		it('should initialize with zero duration', () => {
			const { result } = renderHook(() => useTimer(0))

			expect(result.current.timeRemaining).toBe(0)
			expect(result.current.progress).toBe(0)
		})

		it('should use default warning threshold of 5000ms', () => {
			const { result } = renderHook(() => useTimer(5100))

			// With 5100ms remaining and threshold 5000ms + 100ms buffer
			// isWarning should be true
			expect(result.current.isWarning).toBe(true)
		})

		it('should use custom warning threshold', () => {
			const { result } = renderHook(() =>
				useTimer(10000, { warningThreshold: 3000 })
			)

			expect(result.current.isWarning).toBe(false)
		})
	})

	describe('countdown behavior', () => {
		it('should count down in 100ms intervals', () => {
			const { result } = renderHook(() => useTimer(10000))

			expect(result.current.timeRemaining).toBe(10000)

			act(() => {
				vi.advanceTimersByTime(100)
			})

			expect(result.current.timeRemaining).toBe(9900)

			act(() => {
				vi.advanceTimersByTime(400)
			})

			expect(result.current.timeRemaining).toBe(9500)
		})

		it('should update progress as time passes', () => {
			const { result } = renderHook(() => useTimer(10000))

			expect(result.current.progress).toBe(1)

			act(() => {
				vi.advanceTimersByTime(5000)
			})

			expect(result.current.progress).toBe(0.5)

			act(() => {
				vi.advanceTimersByTime(5000)
			})

			expect(result.current.progress).toBe(0)
		})

		it('should not go below 0', () => {
			const { result } = renderHook(() => useTimer(1000))

			act(() => {
				vi.advanceTimersByTime(2000)
			})

			expect(result.current.timeRemaining).toBe(0)
		})
	})

	describe('warning state', () => {
		it('should enter warning state when time remaining is below threshold', () => {
			const { result } = renderHook(() =>
				useTimer(10000, { warningThreshold: 5000 })
			)

			expect(result.current.isWarning).toBe(false)

			act(() => {
				vi.advanceTimersByTime(5000)
			})

			// Now at 5000ms remaining with 5000ms threshold + buffer
			expect(result.current.isWarning).toBe(true)
		})

		it('should include buffer to prevent rapid state changes', () => {
			const { result } = renderHook(() =>
				useTimer(5100, { warningThreshold: 5000 })
			)

			// With 5100ms and buffer of 100ms, should be in warning
			expect(result.current.isWarning).toBe(true)
		})

		it('should not be in warning state when timer reaches 0', () => {
			const { result } = renderHook(() => useTimer(1000))

			act(() => {
				vi.advanceTimersByTime(1000)
			})

			// At 0, isWarning should be false (timeRemaining > 0 check)
			expect(result.current.isWarning).toBe(false)
		})
	})

	describe('callback triggers', () => {
		it('should call onWarning when entering warning zone', async () => {
			const onWarning = vi.fn()
			renderHook(() =>
				useTimer(10000, {
					onWarning,
					warningThreshold: 5000
				})
			)

			expect(onWarning).not.toHaveBeenCalled()

			act(() => {
				vi.advanceTimersByTime(5000)
			})

			expect(onWarning).toHaveBeenCalledTimes(1)
		})

		it('should call onWarning only once', () => {
			const onWarning = vi.fn()
			renderHook(() =>
				useTimer(10000, {
					onWarning,
					warningThreshold: 5000
				})
			)

			act(() => {
				vi.advanceTimersByTime(6000)
			})

			expect(onWarning).toHaveBeenCalledTimes(1)
		})

		it('should call onTimeout when timer reaches 0', () => {
			const onTimeout = vi.fn()
			renderHook(() => useTimer(1000, { onTimeout }))

			expect(onTimeout).not.toHaveBeenCalled()

			act(() => {
				vi.advanceTimersByTime(1000)
			})

			expect(onTimeout).toHaveBeenCalledTimes(1)
		})

		it('should call onTimeout only once', () => {
			const onTimeout = vi.fn()
			renderHook(() => useTimer(1000, { onTimeout }))

			act(() => {
				vi.advanceTimersByTime(2000)
			})

			expect(onTimeout).toHaveBeenCalledTimes(1)
		})

		it('should not call callbacks when paused', () => {
			const onWarning = vi.fn()
			const onTimeout = vi.fn()
			const { result } = renderHook(
				({ isPaused }) => useTimer(1000, { onWarning, onTimeout, isPaused }),
				{ initialProps: { isPaused: true } }
			)

			act(() => {
				vi.advanceTimersByTime(2000)
			})

			expect(onWarning).not.toHaveBeenCalled()
			expect(onTimeout).not.toHaveBeenCalled()
			expect(result.current.timeRemaining).toBe(1000)
		})
	})

	describe('pause functionality', () => {
		it('should pause the timer when isPaused is true', () => {
			const { result, rerender } = renderHook(
				({ isPaused }) => useTimer(10000, { isPaused }),
				{ initialProps: { isPaused: false } }
			)

			act(() => {
				vi.advanceTimersByTime(1000)
			})

			expect(result.current.timeRemaining).toBe(9000)

			// Pause the timer
			rerender({ isPaused: true })

			act(() => {
				vi.advanceTimersByTime(2000)
			})

			// Should still be at 9000 because timer is paused
			expect(result.current.timeRemaining).toBe(9000)
		})

		it('should resume from paused state', () => {
			const { result, rerender } = renderHook(
				({ isPaused }) => useTimer(10000, { isPaused }),
				{ initialProps: { isPaused: true } }
			)

			act(() => {
				vi.advanceTimersByTime(2000)
			})

			expect(result.current.timeRemaining).toBe(10000)

			// Resume
			rerender({ isPaused: false })

			act(() => {
				vi.advanceTimersByTime(1000)
			})

			expect(result.current.timeRemaining).toBe(9000)
		})
	})

	describe('reset functionality', () => {
		it('should reset timer to full duration', () => {
			const { result } = renderHook(() => useTimer(10000))

			act(() => {
				vi.advanceTimersByTime(5000)
			})

			expect(result.current.timeRemaining).toBe(5000)

			act(() => {
				result.current.reset()
			})

			expect(result.current.timeRemaining).toBe(10000)
			expect(result.current.progress).toBe(1)
		})

		it('should allow warning callback to fire again after reset', () => {
			const onWarning = vi.fn()
			const { result } = renderHook(() =>
				useTimer(10000, {
					onWarning,
					warningThreshold: 5000
				})
			)

			act(() => {
				vi.advanceTimersByTime(6000)
			})

			expect(onWarning).toHaveBeenCalledTimes(1)

			act(() => {
				result.current.reset()
			})

			act(() => {
				vi.advanceTimersByTime(6000)
			})

			expect(onWarning).toHaveBeenCalledTimes(2)
		})

		it('should allow timeout callback to fire again after reset', () => {
			const onTimeout = vi.fn()
			const { result } = renderHook(() => useTimer(1000, { onTimeout }))

			act(() => {
				vi.advanceTimersByTime(1500)
			})

			expect(onTimeout).toHaveBeenCalledTimes(1)

			act(() => {
				result.current.reset()
			})

			act(() => {
				vi.advanceTimersByTime(1500)
			})

			expect(onTimeout).toHaveBeenCalledTimes(2)
		})
	})

	describe('duration changes', () => {
		it('should reset timer when duration prop changes', () => {
			const { result, rerender } = renderHook(
				({ duration }) => useTimer(duration),
				{ initialProps: { duration: 10000 } }
			)

			act(() => {
				vi.advanceTimersByTime(5000)
			})

			expect(result.current.timeRemaining).toBe(5000)

			// Change duration (simulating new question)
			rerender({ duration: 20000 })

			expect(result.current.timeRemaining).toBe(20000)
		})

		it('should reset callback triggers when duration changes', () => {
			const onWarning = vi.fn()
			const { rerender } = renderHook(
				({ duration }) =>
					useTimer(duration, {
						onWarning,
						warningThreshold: 5000
					}),
				{ initialProps: { duration: 10000 } }
			)

			act(() => {
				vi.advanceTimersByTime(6000)
			})

			expect(onWarning).toHaveBeenCalledTimes(1)

			// Change duration
			rerender({ duration: 15000 })

			act(() => {
				vi.advanceTimersByTime(10500)
			})

			expect(onWarning).toHaveBeenCalledTimes(2)
		})
	})

	describe('edge cases', () => {
		it('should handle very short duration', () => {
			const onTimeout = vi.fn()
			const { result } = renderHook(() => useTimer(100, { onTimeout }))

			act(() => {
				vi.advanceTimersByTime(100)
			})

			expect(result.current.timeRemaining).toBe(0)
			expect(onTimeout).toHaveBeenCalledTimes(1)
		})

		it('should handle callback being undefined', () => {
			const { result } = renderHook(() =>
				useTimer(1000, { onTimeout: undefined, onWarning: undefined })
			)

			// Should not throw when advancing past warning and timeout
			act(() => {
				vi.advanceTimersByTime(1500)
			})

			expect(result.current.timeRemaining).toBe(0)
		})

		it('should handle changing callbacks without restarting timer', () => {
			const onTimeout1 = vi.fn()
			const onTimeout2 = vi.fn()

			const { rerender } = renderHook(
				({ onTimeout }) => useTimer(2000, { onTimeout }),
				{ initialProps: { onTimeout: onTimeout1 } }
			)

			act(() => {
				vi.advanceTimersByTime(1000)
			})

			// Change callback
			rerender({ onTimeout: onTimeout2 })

			act(() => {
				vi.advanceTimersByTime(1000)
			})

			expect(onTimeout1).not.toHaveBeenCalled()
			expect(onTimeout2).toHaveBeenCalledTimes(1)
		})
	})

	describe('difficulty timer durations', () => {
		it('should support a 30 second timer for easy difficulty', () => {
			const { result } = renderHook(() => useTimer(30000))

			expect(result.current.timeRemaining).toBe(30000)

			act(() => {
				vi.advanceTimersByTime(30000)
			})

			expect(result.current.timeRemaining).toBe(0)
		})

		it('should support a 20 second timer for medium difficulty', () => {
			const { result } = renderHook(() => useTimer(20000))

			expect(result.current.timeRemaining).toBe(20000)

			act(() => {
				vi.advanceTimersByTime(20000)
			})

			expect(result.current.timeRemaining).toBe(0)
		})

		it('should support a 15 second timer for hard difficulty', () => {
			const { result } = renderHook(() => useTimer(15000))

			expect(result.current.timeRemaining).toBe(15000)

			act(() => {
				vi.advanceTimersByTime(15000)
			})

			expect(result.current.timeRemaining).toBe(0)
		})

		it('should trigger the warning at the 5000ms threshold', () => {
			const onWarning = vi.fn()
			renderHook(() =>
				useTimer(10000, {
					onWarning,
					warningThreshold: 5000
				})
			)

			// At 10000ms - 4800ms = 5200ms remaining, still above threshold + buffer (5100ms)
			act(() => {
				vi.advanceTimersByTime(4800)
			})

			expect(onWarning).not.toHaveBeenCalled()

			// At 5200ms - 200ms = 5000ms remaining, now at threshold (with buffer triggers at 5100ms)
			act(() => {
				vi.advanceTimersByTime(200)
			})

			expect(onWarning).toHaveBeenCalledTimes(1)
		})

		it('should use a buffer to prevent rapid state changes', () => {
			const { result } = renderHook(() =>
				useTimer(5050, { warningThreshold: 5000 })
			)

			// With ~5050ms remaining and 5000ms threshold + 100ms buffer
			// isWarning should be true due to buffer
			expect(result.current.isWarning).toBe(true)
		})
	})
})
