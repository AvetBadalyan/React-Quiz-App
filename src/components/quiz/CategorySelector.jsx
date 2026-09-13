import { CATEGORY_CONFIG } from '../../data/constants.js'

/**
 * Category selector component for quiz configuration
 * Displays a grid of category options (HTML, CSS, JavaScript, React)
 * with visual indication of selected category
 *
 * @param {Object} props
 * @param {string} props.selected - Currently selected category id
 * @param {Function} props.onSelect - Handler for category selection, receives category id
 *
 * Requirements: 1.1, 1.6, 12.1-12.5 (Keyboard accessibility)
 */
export function CategorySelector({ selected, onSelect }) {
	const categories = Object.values(CATEGORY_CONFIG)

	return (
		<div
			className="category-selector"
			role="group"
			aria-labelledby="category-selector-label"
		>
			<h3 id="category-selector-label">Select Category</h3>
			<div
				className="category-selector__grid"
				role="radiogroup"
				aria-label="Quiz categories"
			>
				{categories.map(category => (
					<button
						key={category.id}
						className={`category-selector__item ${selected === category.id ? 'category-selector__item--selected' : ''}`}
						onClick={() => onSelect(category.id)}
						style={{ '--category-color': category.color }}
						aria-pressed={selected === category.id}
						aria-label={`${category.label} category`}
						type="button"
					>
						<span
							className="category-selector__icon"
							aria-hidden="true"
						>
							{category.icon}
						</span>
						<span className="category-selector__label">{category.label}</span>
					</button>
				))}
			</div>
		</div>
	)
}
