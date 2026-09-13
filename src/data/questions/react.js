/**
 * React Question Bank
 *
 * Contains questions covering React topics:
 * - hooks: useState, useEffect, useRef, useCallback, useMemo, custom hooks
 * - components: Component definitions, props, fragments, error boundaries, memo, composition
 * - state: State management, props vs state, controlled components, Context API, reducers
 * - jsx: JSX syntax, conditional rendering, list rendering, event handling
 *
 * Each question has:
 * - id: Unique identifier (format: react-XXX)
 * - text: The question text
 * - answers: Array of 4 options (first is always correct before shuffling)
 * - difficulty: 'easy' | 'medium' | 'hard'
 * - category: 'react'
 * - topic: One of the topic tags
 */

const reactQuestions = [
	// COMPONENTS TOPIC
	{
		id: 'react-001',
		text: 'Which of the following definitions best describes React.js?',
		answers: [
			'A library to build user interfaces with help of declarative code.',
			'A library for managing state in web applications.',
			'A framework to build user interfaces with help of imperative code.',
			'A library used for building mobile applications only.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'components'
	},
	{
		id: 'react-002',
		text: 'What is the most common way to create a component in React?',
		answers: [
			'By defining a JavaScript function that returns a renderable value.',
			'By defining a custom HTML tag in JavaScript.',
			'By creating a file with a .jsx extension.',
			'By using the "new" keyword followed by the component name.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'components'
	},
	{
		id: 'react-003',
		text: 'What are props in React?',
		answers: [
			'Inputs that allow passing data from parent to child components.',
			'Functions that update the component state.',
			'Special HTML attributes only available in React.',
			'CSS properties specific to React components.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'components'
	},
	{
		id: 'react-004',
		text: 'What is a React Fragment?',
		answers: [
			'A feature that lets you group multiple elements without adding an extra node to the DOM.',
			'A piece of a component that can be reused in other components.',
			'A special type of component that only renders once.',
			'A tool for splitting code into smaller chunks.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'components'
	},
	{
		id: 'react-005',
		text: 'What is the purpose of React.memo?',
		answers: [
			"To memoize a component to prevent unnecessary re-renders when its props haven't changed.",
			'To store important information that should be remembered between renders.',
			'To create a memorandum of understanding between components.',
			'To log component activity for debugging purposes.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'components'
	},
	{
		id: 'react-006',
		text: 'What are Error Boundaries in React?',
		answers: [
			'Components that catch JavaScript errors in their child component tree and display a fallback UI.',
			'Special CSS rules that prevent layout errors in React applications.',
			'Testing utilities that identify potential errors before deployment.',
			'Console warnings that appear during development.'
		],
		difficulty: 'hard',
		category: 'react',
		topic: 'components'
	},
	{
		id: 'react-007',
		text: 'What are React Server Components?',
		answers: [
			'Components that render on the server, reducing JavaScript sent to the client and enabling direct access to server resources.',
			'Components that communicate with servers through API calls.',
			'Special components used only in server-side rendering frameworks like Next.js.',
			'Components that store their state on a server instead of in the browser.'
		],
		difficulty: 'hard',
		category: 'react',
		topic: 'components'
	},

	// HOOKS TOPIC
	{
		id: 'react-008',
		text: 'What purpose do React hooks serve?',
		answers: [
			'Enabling the use of state and other React features in functional components.',
			'Creating responsive layouts in React applications.',
			'Handling errors within the application.',
			'Part of the Redux library for managing global state.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'hooks'
	},
	{
		id: 'react-009',
		text: 'What is the purpose of the useEffect hook?',
		answers: [
			'To perform side effects in functional components, such as data fetching or DOM manipulation.',
			'To create new state variables in a component.',
			'To optimize rendering performance in React applications.',
			'To handle form submissions in React.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'hooks'
	},
	{
		id: 'react-010',
		text: 'What is the purpose of the useRef hook?',
		answers: [
			'To create a mutable reference that persists across renders without causing re-renders when changed.',
			'To reference external libraries and integrate them with React.',
			'To create references to CSS styles for a component.',
			'To refer to previous state values in functional components.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'hooks'
	},

	// STATE TOPIC
	{
		id: 'react-011',
		text: 'What does the term "React state" imply?',
		answers: [
			'An object in a component that holds values and may cause the component to render on change.',
			'The lifecycle phase a React component is in.',
			'The overall status of a React application, including all props and components.',
			'A library for managing global state in React applications.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'state'
	},
	{
		id: 'react-012',
		text: 'What is a controlled component in React?',
		answers: [
			'A component where form data is handled by the React state rather than the DOM.',
			'A component that cannot be modified by users.',
			'A component that controls other components in the application.',
			'A component with restricted access to certain features.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'state'
	},
	{
		id: 'react-013',
		text: 'What is the Context API used for in React?',
		answers: [
			'To share data that can be considered global for a tree of React components without prop drilling.',
			'To create animations between component transitions.',
			'To handle HTTP requests to external APIs.',
			'To optimize images and other media in React applications.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'state'
	},
	{
		id: 'react-014',
		text: 'What is the difference between state and props?',
		answers: [
			'State is managed within a component and can change, while props are passed to a component and are immutable.',
			'State is passed from parent components, while props are defined internally.',
			'State is always public, while props can be private to a component.',
			'State is used for styling, while props are used for data management.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'state'
	},

	// JSX TOPIC
	{
		id: 'react-015',
		text: 'Can you identify what JSX is?',
		answers: [
			'A JavaScript extension that adds HTML-like syntax to JavaScript.',
			'A JavaScript library for building dynamic user interfaces.',
			'A specific HTML version that was explicitly created for React.',
			'A tool for making HTTP requests in a React application.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'jsx'
	},
	{
		id: 'react-016',
		text: 'How do you typically render list content in React apps?',
		answers: [
			'By using the map() method to iterate over an array of data and returning JSX.',
			'By using the for() loop to iterate over an array of data and returning JSX.',
			'By using the forEach() method to iterate over an array of data and returning JSX.',
			'By using the loop() method to iterate over an array of data and returning JSX.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'jsx'
	},
	{
		id: 'react-017',
		text: 'Which approach can NOT be used to render content conditionally?',
		answers: [
			'Using a the #if template syntax.',
			'Using a ternary operator.',
			'Using the && operator.',
			'Using an if-else statement.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'jsx'
	},
	{
		id: 'react-018',
		text: 'Why is the "key" prop important when rendering lists in React?',
		answers: [
			'It helps React identify which items have changed, been added, or removed, improving rendering efficiency.',
			'It is required for CSS styling of list items.',
			'It provides accessibility features for screen readers.',
			'It is used to sort the list items automatically.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'jsx'
	},
	{
		id: 'react-019',
		text: 'What is the Virtual DOM in React?',
		answers: [
			'A lightweight copy of the real DOM that React uses to optimize rendering performance.',
			'A special browser feature that only works with React applications.',
			'A database where React stores component information.',
			'The actual HTML DOM that the browser renders.'
		],
		difficulty: 'medium',
		category: 'react',
		topic: 'jsx'
	},
	{
		id: 'react-020',
		text: 'How do you handle events in React?',
		answers: [
			'By using camelCase event handlers and passing functions as event handlers rather than strings.',
			'By adding event listeners directly to the DOM using document.addEventListener.',
			'By using lowercase event handlers similar to standard HTML.',
			'By creating separate event handler files that are imported into components.'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'jsx'
	}
]

export default reactQuestions
