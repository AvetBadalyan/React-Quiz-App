/**
 * Badge Component
 *
 * A visual indicator for category and difficulty labels.
 * Supports custom colors through CSS variables and different visual variants.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content (text or icon)
 * @param {'category' | 'difficulty'} [props.variant='category'] - Badge visual style
 * @param {string} [props.color] - Custom color in hex format (e.g., '#61dafb')
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Badge element
 *
 * @example
 * // Category badge with custom color
 * <Badge variant="category" color="#61dafb">React</Badge>
 *
 * @example
 * // Difficulty badge
 * <Badge variant="difficulty">Hard</Badge>
 *
 * @requirements 1.6, 1.7 - Visual indication of selected category and difficulty
 */
export function Badge({ children, variant = 'category', color, className }) {
	const style = color ? { '--badge-color': color } : undefined

	return (
		<span
			className={`badge badge--${variant} ${className || ''}`}
			style={style}
		>
			{children}
		</span>
	)
}
