import { Component } from 'react'

/**
 * ErrorFallback - Pure functional component for error display
 */
function ErrorFallback({ error, errorInfo, onReset, onReload }) {
	return (
		<div
			className="error-boundary"
			role="alert"
			aria-live="assertive"
		>
			<div className="error-boundary__content">
				<div
					className="error-boundary__icon"
					aria-hidden="true"
				>
					⚠️
				</div>
				<h2 className="error-boundary__title">Something went wrong</h2>
				<p className="error-boundary__message">
					We're sorry, but an unexpected error occurred. Please try again.
				</p>

				{import.meta.env.DEV && error && (
					<details className="error-boundary__details">
						<summary>Error Details</summary>
						<pre className="error-boundary__stack">
							{error.toString()}
							{errorInfo?.componentStack}
						</pre>
					</details>
				)}

				<div className="error-boundary__actions">
					<button
						className="btn btn-primary error-boundary__button"
						onClick={onReset}
						type="button"
					>
						Try Again
					</button>
					<button
						className="btn btn-secondary error-boundary__button"
						onClick={onReload}
						type="button"
					>
						Reload Page
					</button>
				</div>
			</div>
		</div>
	)
}

function resetError(component) {
	component.setState({ hasError: false, error: null, errorInfo: null })
}

function reloadPage() {
	window.location.reload()
}

/**
 * ErrorBoundary - Catches errors in child components
 *
 * IMPORTANT: React REQUIRES a class component for error boundaries.
 * There is NO hook equivalent for getDerivedStateFromError/componentDidCatch.
 * This is a React API limitation, not a design choice.
 * See: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
export class ErrorBoundary extends Component {
	state = { hasError: false, error: null, errorInfo: null }

	static getDerivedStateFromError(error) {
		return { hasError: true, error }
	}

	componentDidCatch(error, errorInfo) {
		console.error('ErrorBoundary caught an error:', error)
		console.error('Component stack:', errorInfo.componentStack)

		const { onError } = this.props
		this.setState({ errorInfo })
		if (onError) onError(error, errorInfo)
	}

	render() {
		const { hasError, error, errorInfo } = this.state
		const { fallback, children } = this.props

		if (!hasError) return children
		if (fallback) return fallback

		return (
			<ErrorFallback
				error={error}
				errorInfo={errorInfo}
				onReset={() => resetError(this)}
				onReload={reloadPage}
			/>
		)
	}
}

export default ErrorBoundary
