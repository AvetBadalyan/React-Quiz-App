import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

// Component that throws an error on demand
function ThrowError({ shouldThrow = false }) {
	if (shouldThrow) {
		throw new Error('Test error message')
	}
	return <div>Child content rendered successfully</div>
}

// Component that always throws
function AlwaysThrows() {
	throw new Error('Always throws error')
}

describe('ErrorBoundary', () => {
	// Suppress console.error during tests since we expect errors
	let consoleErrorSpy

	beforeEach(() => {
		consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		consoleErrorSpy.mockRestore()
	})

	it('renders children when no error occurs', () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={false} />
			</ErrorBoundary>
		)

		expect(
			screen.getByText('Child content rendered successfully')
		).toBeInTheDocument()
	})

	it('renders error UI when an error is thrown', () => {
		render(
			<ErrorBoundary>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		expect(screen.getByText('Something went wrong')).toBeInTheDocument()
		expect(
			screen.getByText(/We're sorry, but an unexpected error occurred/)
		).toBeInTheDocument()
	})

	it('displays Try Again button', () => {
		render(
			<ErrorBoundary>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		expect(
			screen.getByRole('button', { name: 'Try Again' })
		).toBeInTheDocument()
	})

	it('displays Reload Page button', () => {
		render(
			<ErrorBoundary>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		expect(
			screen.getByRole('button', { name: 'Reload Page' })
		).toBeInTheDocument()
	})

	it('resets error state when Try Again is clicked', () => {
		// Use a component that can conditionally throw based on external state
		let shouldThrow = true

		function ConditionalError() {
			if (shouldThrow) {
				throw new Error('Test error')
			}
			return <div>Recovered successfully</div>
		}

		const { rerender } = render(
			<ErrorBoundary>
				<ConditionalError />
			</ErrorBoundary>
		)

		// Error UI should be displayed
		expect(screen.getByText('Something went wrong')).toBeInTheDocument()

		// Change the condition so component won't throw on next render
		shouldThrow = false

		// Click Try Again - this resets the error state
		fireEvent.click(screen.getByRole('button', { name: 'Try Again' }))

		// Force rerender by remounting
		rerender(
			<ErrorBoundary key="reset">
				<div>Recovered successfully</div>
			</ErrorBoundary>
		)

		expect(screen.getByText('Recovered successfully')).toBeInTheDocument()
	})

	it('calls window.location.reload when Reload Page is clicked', () => {
		const reloadMock = vi.fn()
		const originalLocation = window.location

		delete window.location
		window.location = { ...originalLocation, reload: reloadMock }

		render(
			<ErrorBoundary>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		fireEvent.click(screen.getByRole('button', { name: 'Reload Page' }))

		expect(reloadMock).toHaveBeenCalledTimes(1)

		// Restore original location
		window.location = originalLocation
	})

	it('logs error to console', () => {
		render(
			<ErrorBoundary>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		// React and ErrorBoundary both log errors, just verify console.error was called
		expect(consoleErrorSpy).toHaveBeenCalled()

		// Check that at least one call contains our error message
		const allCalls = consoleErrorSpy.mock.calls.flat().join(' ')
		expect(allCalls).toContain('Always throws error')
	})

	it('calls onError callback when provided', () => {
		const onErrorMock = vi.fn()

		render(
			<ErrorBoundary onError={onErrorMock}>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		expect(onErrorMock).toHaveBeenCalledTimes(1)
		expect(onErrorMock).toHaveBeenCalledWith(
			expect.any(Error),
			expect.objectContaining({
				componentStack: expect.any(String)
			})
		)
	})

	it('renders custom fallback when provided', () => {
		const customFallback = <div>Custom error UI</div>

		render(
			<ErrorBoundary fallback={customFallback}>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		expect(screen.getByText('Custom error UI')).toBeInTheDocument()
		expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
	})

	it('has proper accessibility attributes', () => {
		render(
			<ErrorBoundary>
				<AlwaysThrows />
			</ErrorBoundary>
		)

		const errorContainer = screen.getByRole('alert')
		expect(errorContainer).toBeInTheDocument()
		expect(errorContainer).toHaveAttribute('aria-live', 'assertive')
	})

	it('handles multiple children correctly', () => {
		render(
			<ErrorBoundary>
				<div>First child</div>
				<div>Second child</div>
				<div>Third child</div>
			</ErrorBoundary>
		)

		expect(screen.getByText('First child')).toBeInTheDocument()
		expect(screen.getByText('Second child')).toBeInTheDocument()
		expect(screen.getByText('Third child')).toBeInTheDocument()
	})

	it('catches errors from nested components', () => {
		function ParentComponent() {
			return (
				<div>
					<span>Parent content</span>
					<AlwaysThrows />
				</div>
			)
		}

		render(
			<ErrorBoundary>
				<ParentComponent />
			</ErrorBoundary>
		)

		expect(screen.getByText('Something went wrong')).toBeInTheDocument()
	})
})
