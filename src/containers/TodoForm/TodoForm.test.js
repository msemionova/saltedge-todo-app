import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoForm from './TodoForm';
import {INPUT_CONFIG} from "./TodoForm";
import {ERROR_MESSAGES} from "./TodoForm";

describe('TodoForm:', () => {
  const todoAdd = jest.fn();

  test('renders correctly', () => {
    const {queryByTestId} = render(<TodoForm />);
    expect(queryByTestId('todo-form')).toBeTruthy();
    expect(queryByTestId('todo-input')).toBeTruthy();
    expect(queryByTestId('add-todo-btn')).toBeTruthy();
  });

  test('submits result', () => {
    todoAdd.mockImplementation(event => {
      event.preventDefault()
    });
    const {queryByTestId} = render(<TodoForm added={todoAdd} />);
    fireEvent.submit(queryByTestId('todo-form'));
    expect(todoAdd).toHaveBeenCalled();
  })

  describe('Input value:', () => {
    test('updates on change', () => {
      const {queryByTestId} = render(<TodoForm />);
      const input = queryByTestId('todo-input');

      fireEvent.change(input, {target: {value: 'test'}});
      expect(input.value).toBe('test');
    });

    test('shows error message if query is empty after edit', () => {
      const {queryByTestId} = render(<TodoForm />);
      const input = queryByTestId('todo-input');
      fireEvent.change(input, {target: {value: '1'}});
      fireEvent.change(input, {target: {value: ''}});

      const errorMessageText = screen.getByText(ERROR_MESSAGES.REQUIRED);
      expect(errorMessageText).toBeTruthy();
    });
  });

  describe('Add button:', () => {
    const todoAdd = jest.fn();

    describe('with empty query:', () => {
      test('does not trigger todoAdd function if empty', () => {
        const {queryByTestId} = render(<TodoForm added={todoAdd} />);
        fireEvent.click(queryByTestId('add-todo-btn'));
        expect(todoAdd).not.toHaveBeenCalled();
      });

      test('does not trigger todoAdd function if contains only spaces', () => {
        const {queryByTestId} = render(<TodoForm added={todoAdd} />);
        const input = queryByTestId('todo-input');

        fireEvent.change(input, {target: {value: '      '}});
        fireEvent.click(queryByTestId('add-todo-btn'));
        expect(todoAdd).not.toHaveBeenCalled();
      });
    });

    describe('with correct data inside query:', () => {
      test('triggers todoAdd function', () => {
        todoAdd.mockImplementation(event => {
          event.preventDefault()
        });
        const {queryByTestId} = render(<TodoForm added={todoAdd} />);
        const input = queryByTestId('todo-input');
        fireEvent.change(input, {target: {value: 't'.repeat(INPUT_CONFIG.MIN_LENGTH)}});

        fireEvent.click(queryByTestId('add-todo-btn'));
        expect(todoAdd).toHaveBeenCalled();
      });
    });

    describe('with incorrect data inside query:', () => {
      test('does not trigger todoAdd function with a short query', () => {
        const todoAdd = jest.fn();
        const {queryByTestId} = render(<TodoForm added={todoAdd} />);
        const input = queryByTestId('todo-input');
        fireEvent.change(input, {target: {value: 't'.repeat(INPUT_CONFIG.MIN_LENGTH - 1)}});

        fireEvent.click(queryByTestId('add-todo-btn'));
        expect(todoAdd).not.toHaveBeenCalled();
      });

      test('does not trigger todoAdd function with a long query', () => {
        const todoAdd = jest.fn();
        const {queryByTestId} = render(<TodoForm added={todoAdd} />);
        const input = queryByTestId('todo-input');
        fireEvent.change(input, {target: {value: 't'.repeat(INPUT_CONFIG.MAX_LENGTH + 1)}});

        fireEvent.click(queryByTestId('add-todo-btn'));
        expect(todoAdd).not.toHaveBeenCalled();
      });

      test('shows error message if query is too short', () => {
        const {queryByTestId} = render(<TodoForm />);
        const input = queryByTestId('todo-input');
        fireEvent.change(input, {target: {value: 't'.repeat(INPUT_CONFIG.MIN_LENGTH - 1)}});

        const errorMessageText = screen.getByText(ERROR_MESSAGES.MIN_LENGTH);
        expect(errorMessageText).toBeTruthy();
      });

      test('shows error message if query is too long', () => {
        const {queryByTestId} = render(<TodoForm />);
        const input = queryByTestId('todo-input');
        fireEvent.change(input, {target: {value: 't'.repeat(INPUT_CONFIG.MAX_LENGTH + 1)}});

        const errorMessageText = screen.getByText(ERROR_MESSAGES.MAX_LENGTH);
        expect(errorMessageText).toBeTruthy();
      });
    });
  });
});
