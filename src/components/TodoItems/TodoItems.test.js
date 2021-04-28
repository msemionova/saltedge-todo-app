import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import TodoItems from "./TodoItems";

describe('TodoItems:', () => {
  const changeTodo = jest.fn();
  const deleteTodo = jest.fn();

  let testTodos;
  beforeEach(() => {
    testTodos = [{
      title: 'Test1',
      checked: false,
      id: 0
    },
    {
      title: 'Test2',
      checked: false,
      id: 1
    }];
  })

  test('Renders empty state correctly', () => {
    const {queryByTestId} = render(<TodoItems todos={[]}/>);
    expect(queryByTestId('todo-list-empty')).toBeTruthy();
  });

  test('Renders Todos correctly', () => {
    const {queryByTestId} = render(<TodoItems todos={testTodos} />);
    const todoList = queryByTestId('todo-list');
    expect(todoList).toBeTruthy();
    expect(todoList.childElementCount).toBe(testTodos.length);
  });

  describe('Todo Checkbox:', () => {
    test('Click on checkbox triggers changeTodo function', () => {
      const {queryByTestId} = render(<TodoItems todos={testTodos} changed={changeTodo} />);
      const checkbox = queryByTestId('checkbox-0');
      fireEvent.click(checkbox);
      expect(changeTodo).toHaveBeenCalled();
    });
  });

  describe('Delete Button:', () => {
    test('Click on delete button triggers deleteTodo function', () => {
      const {queryByTestId} = render(<TodoItems todos={testTodos} changed={changeTodo} deleted={deleteTodo}/>);
      const deleteButton = queryByTestId('delete-btn-0');
      fireEvent.click(deleteButton);
      expect(deleteTodo).toHaveBeenCalled();
    });
  });
});
