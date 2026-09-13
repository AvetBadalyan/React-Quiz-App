/**
 * HTML Question Bank
 *
 * Contains questions covering HTML topics:
 * - forms: Form elements, validation, input types
 * - semantics: Semantic HTML elements and their proper usage
 * - accessibility: ARIA, accessibility best practices
 * - media: Images, video, audio, responsive media
 *
 * Each question has:
 * - id: Unique identifier (format: html-XXX)
 * - text: The question text
 * - answers: Array of 4 options (first is always correct before shuffling)
 * - difficulty: 'easy' | 'medium' | 'hard'
 * - category: 'html'
 * - topic: One of the topic tags
 */

const htmlQuestions = [
	// FORMS TOPIC (5 questions)
	{
		id: 'html-001',
		text: 'Which HTML attribute is used to specify that an input field must be filled out before submitting the form?',
		answers: ['required', 'mandatory', 'validate', 'necessary'],
		difficulty: 'easy',
		category: 'html',
		topic: 'forms'
	},
	{
		id: 'html-002',
		text: 'Which input type is specifically designed for email addresses and provides built-in validation?',
		answers: ['email', 'text', 'mail', 'address'],
		difficulty: 'easy',
		category: 'html',
		topic: 'forms'
	},
	{
		id: 'html-003',
		text: 'What is the purpose of the <label> element in HTML forms?',
		answers: [
			'To associate a text label with a form control for accessibility',
			'To create a container for form elements',
			'To style form inputs with CSS',
			'To submit the form when clicked'
		],
		difficulty: 'medium',
		category: 'html',
		topic: 'forms'
	},
	{
		id: 'html-004',
		text: 'Which attribute prevents the browser from validating a form when submitted?',
		answers: ['novalidate', 'no-validate', 'skip-validation', 'validateoff'],
		difficulty: 'medium',
		category: 'html',
		topic: 'forms'
	},
	{
		id: 'html-005',
		text: 'What is the difference between the "name" and "id" attributes on form inputs?',
		answers: [
			'name is sent with form data to server, id is for DOM identification',
			'id is sent with form data to server, name is for DOM identification',
			'They serve the exact same purpose',
			'name is only for radio buttons, id is for all inputs'
		],
		difficulty: 'hard',
		category: 'html',
		topic: 'forms'
	},

	// SEMANTICS TOPIC (5 questions)
	{
		id: 'html-006',
		text: 'Which HTML element is used for the main heading of a page?',
		answers: ['<h1>', '<header>', '<heading>', '<main>'],
		difficulty: 'easy',
		category: 'html',
		topic: 'semantics'
	},
	{
		id: 'html-007',
		text: 'Which semantic element represents a standalone section of content that could be distributed independently?',
		answers: ['<article>', '<section>', '<div>', '<aside>'],
		difficulty: 'medium',
		category: 'html',
		topic: 'semantics'
	},
	{
		id: 'html-008',
		text: 'What is the correct semantic element for navigation links?',
		answers: ['<nav>', '<navigation>', '<menu>', '<links>'],
		difficulty: 'easy',
		category: 'html',
		topic: 'semantics'
	},
	{
		id: 'html-009',
		text: 'Which element should be used for content that is tangentially related to the main content?',
		answers: ['<aside>', '<sidebar>', '<related>', '<secondary>'],
		difficulty: 'medium',
		category: 'html',
		topic: 'semantics'
	},
	{
		id: 'html-010',
		text: 'What is the semantic difference between <strong> and <b> elements?',
		answers: [
			'<strong> conveys importance while <b> is only for visual styling',
			'<b> conveys importance while <strong> is only for visual styling',
			'There is no semantic difference',
			'<strong> is deprecated in HTML5'
		],
		difficulty: 'hard',
		category: 'html',
		topic: 'semantics'
	},

	// ACCESSIBILITY TOPIC (5 questions)
	{
		id: 'html-011',
		text: 'What does the "alt" attribute provide for images?',
		answers: [
			'Alternative text for screen readers and when images fail to load',
			'Alternative styling for images',
			'Alternative image source for mobile devices',
			'Alternative colors for the image'
		],
		difficulty: 'easy',
		category: 'html',
		topic: 'accessibility'
	},
	{
		id: 'html-012',
		text: 'Which ARIA attribute is used to provide a label for an element that has no visible text?',
		answers: ['aria-label', 'aria-text', 'aria-name', 'aria-title'],
		difficulty: 'medium',
		category: 'html',
		topic: 'accessibility'
	},
	{
		id: 'html-013',
		text: 'What is the purpose of the "tabindex" attribute?',
		answers: [
			'To control the tab order of focusable elements',
			'To create tabs in the interface',
			'To specify the number of table columns',
			'To indent paragraphs'
		],
		difficulty: 'medium',
		category: 'html',
		topic: 'accessibility'
	},
	{
		id: 'html-014',
		text: 'Which ARIA role would you use for a button that opens a dropdown menu?',
		answers: ['button with aria-haspopup', 'menu', 'dropdown', 'popup'],
		difficulty: 'hard',
		category: 'html',
		topic: 'accessibility'
	},
	{
		id: 'html-015',
		text: 'What does aria-live="polite" tell assistive technologies?',
		answers: [
			'Announce changes when the user is idle',
			'Never announce changes',
			'Announce changes immediately, interrupting current speech',
			'Announce changes only when the element is focused'
		],
		difficulty: 'hard',
		category: 'html',
		topic: 'accessibility'
	},

	// MEDIA TOPIC (5 questions)
	{
		id: 'html-016',
		text: 'Which HTML element is used to embed video content?',
		answers: ['<video>', '<media>', '<movie>', '<embed>'],
		difficulty: 'easy',
		category: 'html',
		topic: 'media'
	},
	{
		id: 'html-017',
		text: 'What is the purpose of the <picture> element?',
		answers: [
			'To provide multiple image sources for responsive images',
			'To display a gallery of pictures',
			'To add a frame around images',
			'To create image slideshows'
		],
		difficulty: 'medium',
		category: 'html',
		topic: 'media'
	},
	{
		id: 'html-018',
		text: 'Which attribute makes a video or audio element play immediately when the page loads?',
		answers: ['autoplay', 'auto', 'play', 'immediate'],
		difficulty: 'easy',
		category: 'html',
		topic: 'media'
	},
	{
		id: 'html-019',
		text: 'What is the purpose of the "srcset" attribute on an <img> element?',
		answers: [
			'To provide multiple image sources for different screen resolutions',
			'To set multiple backup image sources',
			'To create an image carousel',
			'To specify image dimensions'
		],
		difficulty: 'medium',
		category: 'html',
		topic: 'media'
	},
	{
		id: 'html-020',
		text: 'Which element is used to provide subtitles or captions for video content?',
		answers: ['<track>', '<caption>', '<subtitle>', '<text>'],
		difficulty: 'hard',
		category: 'html',
		topic: 'media'
	}
]

export default htmlQuestions
