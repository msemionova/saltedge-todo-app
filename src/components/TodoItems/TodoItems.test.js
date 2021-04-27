import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import TodoItems from "./TodoItems";

describe('TodoItems:', () => {
  let props;
  const changeTodo = jest.fn();
  const deleteTodo = jest.fn();

  beforeEach(() => {
    props = {
      todos: [{
        title: 'Test1',
        checked: false,
        id: 0
      },
      {
        title: 'Test2',
        checked: false,
        id: 1
      }]
    };
  });

  test('Renders empty state correctly', () => {
    props = {
      todos: []
    };
    const {queryByTestId} = render(<TodoItems todos={props.todos}/>);
    expect(queryByTestId('todo-list-empty')).toBeTruthy();
  });

  test('Renders Todos correctly', () => {
    const {queryByTestId} = render(<TodoItems todos={props.todos} />);
    const todoList = queryByTestId('todo-list');
    expect(todoList).toBeTruthy();
    expect(todoList.childElementCount).toBe(props.todos.length);
  });

  describe('Todo Checkbox:', () => {
    test('Click on checkbox triggers changeTodo function', () => {
      const {queryByTestId} = render(<TodoItems todos={props.todos} changed={changeTodo}/>);
      const checkbox = queryByTestId('checkbox-0');
      fireEvent.click(checkbox);
      expect(changeTodo).toHaveBeenCalled();
    });
  });

  describe('Delete Button:', () => {
    test('Click on delete button triggers deleteTodo function', () => {
      const {queryByTestId} = render(<TodoItems todos={props.todos} changed={changeTodo} deleted={deleteTodo}/>);
      const deleteButton = queryByTestId('delete-btn-0');
      fireEvent.click(deleteButton);
      expect(deleteTodo).toHaveBeenCalled();
    });
  });
});
