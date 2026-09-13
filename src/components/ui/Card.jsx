/**
 * Card Component
 *
 * A reusable container component with consistent styling for screens and sections.
 * Provides visual grouping for related content with standardized padding and borders.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes for customization
 * @returns {JSX.Element} Card container element
 *
 * @example
 * <Card className="my-custom-class">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 */
export function Card({ children, className }) {
	return <div className={`card ${className || ''}`}>{children}</div>
}
