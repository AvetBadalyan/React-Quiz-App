import { motion } from 'framer-motion'
import { forwardRef } from 'react'

/**
 * Animated button component with Framer Motion animations
 *
 * Supports ref forwarding for focus management and external control.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'answer'} props.variant - Button variant for styling
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type (default: 'button')
 * Additional ARIA attributes are passed through to the button element
 *
 * Requirements: 12.1-12.5 (Keyboard accessibility)
 */
export const Button = forwardRef(function Button(
	{
		variant = 'primary',
		children,
		disabled = false,
		className = '',
		onClick,
		type = 'button',
		...props
	},
	ref
) {
	return (
		<motion.button
			ref={ref}
			type={type}
			className={`btn btn-${variant} ${className}`.trim()}
			whileHover={{ scale: disabled ? 1 : 1.02 }}
			whileTap={{ scale: disabled ? 1 : 0.95 }}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{children}
		</motion.button>
	)
})
