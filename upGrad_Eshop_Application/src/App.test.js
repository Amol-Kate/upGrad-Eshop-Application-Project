import { render, screen } from '@testing-library/react'; // Importing the render and screen utilities from @testing-library/react
import App from './App'; // Importing the App component

// Define a test case to check if the "learn react" link is rendered in the document
test('renders learn react link', () => {
  // Render the App component
  render(<App />);

  // Use screen.getByText to find an element with text matching the regex /learn react/i (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);

  // Use an assertion to check if the linkElement is present in the document
  expect(linkElement).toBeInTheDocument();
});
