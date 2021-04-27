import { render } from '@testing-library/react';
import App from './App';

describe('Todo App:', () => {
  test('renders correctly', () => {
    const {queryByTestId} = render(<App />);
    expect(queryByTestId('navbar')).toBeTruthy();
    expect(queryByTestId('saltedge-logo')).toBeTruthy();
    expect(queryByTestId('layout')).toBeTruthy();
    expect(queryByTestId('container')).toBeTruthy();
    expect(queryByTestId('heading')).toBeTruthy();
    expect(queryByTestId('todo-form')).toBeTruthy();
  });
});
