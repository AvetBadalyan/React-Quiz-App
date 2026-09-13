/**
 * Toggle Component
 *
 * An accessible toggle switch for binary on/off states.
 * Used primarily for sound control. Implements proper ARIA attributes
 * including role="switch" for assistive technology support.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.checked - Whether the toggle is on or off
 * @param {Function} props.onChange - Handler called when toggle state changes, receives (boolean) => void
 * @param {string} [props.label] - Accessible label text (also displayed visually if provided)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Toggle switch element
 *
 * @example
 * const [enabled, setEnabled] = useState(false)
 * <Toggle
 *   checked={enabled}
 *   onChange={setEnabled}
 *   label="Sound effects"
 * />
 */
export function Toggle({ checked, onChange, label, className }) {
	return (
		<label className={`toggle ${className || ''}`}>
			<input
				type="checkbox"
				checked={checked}
				onChange={e => onChange?.(e.target.checked)}
				className="toggle__input"
				role="switch"
				aria-checked={checked}
			/>
			<span
				className={`toggle__slider ${checked ? 'toggle__slider--checked' : ''}`}
				aria-hidden="true"
			/>
			{label && <span className="toggle__label">{label}</span>}
		</label>
	)
}
