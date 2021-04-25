import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TODO heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/TODOs/i);
  expect(headingElement).toBeInTheDocument();
});
