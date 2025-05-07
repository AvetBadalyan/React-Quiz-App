export default [
  {
    id: 'q1',
    text: 'Which of the following definitions best describes React.js?',
    answers: [
      'A library to build user interfaces with help of declarative code.',
      'A library for managing state in web applications.',
      'A framework to build user interfaces with help of imperative code.',
      'A library used for building mobile applications only.',
    ],
  },
  {
    id: 'q2',
    text: 'What purpose do React hooks serve?',
    answers: [
      'Enabling the use of state and other React features in functional components.',
      'Creating responsive layouts in React applications.',
      'Handling errors within the application.',
      'Part of the Redux library for managing global state.',
    ],
  },
  {
    id: 'q3',
    text: 'Can you identify what JSX is?',
    answers: [
      'A JavaScript extension that adds HTML-like syntax to JavaScript.',
      'A JavaScript library for building dynamic user interfaces.',
      'A specific HTML version that was explicitly created for React.',
      'A tool for making HTTP requests in a React application.',
    ],
  },
  {
    id: 'q4',
    text: 'What is the most common way to create a component in React?',
    answers: [
      'By defining a JavaScript function that returns a renderable value.',
      'By defining a custom HTML tag in JavaScript.',
      'By creating a file with a .jsx extension.',
      'By using the "new" keyword followed by the component name.',
    ],
  },
  {
    id: 'q5',
    text: 'What does the term "React state" imply?',
    answers: [
      'An object in a component that holds values and may cause the component to render on change.',
      'The lifecycle phase a React component is in.',
      'The overall status of a React application, including all props and components.',
      'A library for managing global state in React applications.',
    ],
  },
  {
    id: 'q6',
    text: 'How do you typically render list content in React apps?',
    answers: [
      'By using the map() method to iterate over an array of data and returning JSX.',
      'By using the for() loop to iterate over an array of data and returning JSX.',
      'By using the forEach() method to iterate over an array of data and returning JSX.',
      'By using the loop() method to iterate over an array of data and returning JSX.',
    ],
  },
  {
    id: 'q7',
    text: 'Which approach can NOT be used to render content conditionally?',
    answers: [
      'Using a the #if template syntax.',
      'Using a ternary operator.',
      'Using the && operator.',
      'Using an if-else statement.',
    ],
  },
  {
    id: 'q8',
    text: 'What are props in React?',
    answers: [
      'Inputs that allow passing data from parent to child components.',
      'Functions that update the component state.',
      'Special HTML attributes only available in React.',
      'CSS properties specific to React components.',
    ],
  },
  {
    id: 'q9',
    text: 'What is the Virtual DOM in React?',
    answers: [
      'A lightweight copy of the real DOM that React uses to optimize rendering performance.',
      'A special browser feature that only works with React applications.',
      'A database where React stores component information.',
      'The actual HTML DOM that the browser renders.',
    ],
  },
  {
    id: 'q10',
    text: 'What is the purpose of the useEffect hook?',
    answers: [
      'To perform side effects in functional components, such as data fetching or DOM manipulation.',
      'To create new state variables in a component.',
      'To optimize rendering performance in React applications.',
      'To handle form submissions in React.',
    ],
  },
  {
    id: 'q11',
    text: 'Why is the "key" prop important when rendering lists in React?',
    answers: [
      'It helps React identify which items have changed, been added, or removed, improving rendering efficiency.',
      'It is required for CSS styling of list items.',
      'It provides accessibility features for screen readers.',
      'It is used to sort the list items automatically.',
    ],
  },
  {
    id: 'q12',
    text: 'What is the Context API used for in React?',
    answers: [
      'To share data that can be considered global for a tree of React components without prop drilling.',
      'To create animations between component transitions.',
      'To handle HTTP requests to external APIs.',
      'To optimize images and other media in React applications.',
    ],
  },
  {
    id: 'q13',
    text: 'What is a controlled component in React?',
    answers: [
      'A component where form data is handled by the React state rather than the DOM.',
      'A component that cannot be modified by users.',
      'A component that controls other components in the application.',
      'A component with restricted access to certain features.',
    ],
  },
  {
    id: 'q14',
    text: 'What is a React Fragment?',
    answers: [
      'A feature that lets you group multiple elements without adding an extra node to the DOM.',
      'A piece of a component that can be reused in other components.',
      'A special type of component that only renders once.',
      'A tool for splitting code into smaller chunks.',
    ],
  },
  {
    id: 'q15',
    text: 'What is the purpose of React.memo?',
    answers: [
      "To memoize a component to prevent unnecessary re-renders when its props haven't changed.",
      'To store important information that should be remembered between renders.',
      'To create a memorandum of understanding between components.',
      'To log component activity for debugging purposes.',
    ],
  },
  {
    id: 'q16',
    text: 'What are Error Boundaries in React?',
    answers: [
      'Components that catch JavaScript errors in their child component tree and display a fallback UI.',
      'Special CSS rules that prevent layout errors in React applications.',
      'Testing utilities that identify potential errors before deployment.',
      'Console warnings that appear during development.',
    ],
  },
  {
    id: 'q17',
    text: 'What is the purpose of the useRef hook?',
    answers: [
      'To create a mutable reference that persists across renders without causing re-renders when changed.',
      'To reference external libraries and integrate them with React.',
      'To create references to CSS styles for a component.',
      'To refer to previous state values in functional components.',
    ],
  },
  {
    id: 'q18',
    text: 'What is the difference between state and props?',
    answers: [
      'State is managed within a component and can change, while props are passed to a component and are immutable.',
      'State is passed from parent components, while props are defined internally.',
      'State is always public, while props can be private to a component.',
      'State is used for styling, while props are used for data management.',
    ],
  },
  {
    id: 'q19',
    text: 'What are React Server Components?',
    answers: [
      'Components that render on the server, reducing JavaScript sent to the client and enabling direct access to server resources.',
      'Components that communicate with servers through API calls.',
      'Special components used only in server-side rendering frameworks like Next.js.',
      'Components that store their state on a server instead of in the browser.',
    ],
  },
  {
    id: 'q20',
    text: 'How do you handle events in React?',
    answers: [
      'By using camelCase event handlers and passing functions as event handlers rather than strings.',
      'By adding event listeners directly to the DOM using document.addEventListener.',
      'By using lowercase event handlers similar to standard HTML.',
      'By creating separate event handler files that are imported into components.',
    ],
  },
];
