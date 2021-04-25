import React, { useState } from 'react';
import TodoItems from '../components/TodoItems/TodoItems';

const TodoController = () => {
  const initialState = {
    todos: []
  };
  const currentState = JSON.parse(localStorage.getItem('state'));
  const [state, setState] = useState(currentState || initialState);

  const updateLocalStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state));
  };

  const addTodoHandler = (event, value) => {
    event.preventDefault();
    const updatedState = {todos: [...state.todos]};
    updatedState.todos.push({
      id: Date.now(),
      title: value,
      checked: false
    })
    setState(updatedState);
    updateLocalStorage(updatedState);
  };

  const changeTodoHandler = (event, id) => {
    console.log(event.type);
    if (event.type === 'change' || event.type === 'click' || event.key === "Enter") {
      const updatedState = {todos: [...state.todos]};
      const changedTodo = updatedState.todos.find(todo => todo.id === id);
      changedTodo.checked = !changedTodo.checked;
      setState(updatedState);
      updateLocalStorage(updatedState);
    }
  };

  const deleteTodoHandler = (event, id) => {
    event.stopPropagation();
    const updatedState = {todos: [...state.todos]};
    updatedState.todos = updatedState.todos.filter(todo => todo.id !== id);
    setState(updatedState);
    updateLocalStorage(updatedState);
  };

  return <TodoItems
    todos={state.todos}
    deleted={deleteTodoHandler}
    changed={changeTodoHandler}
    added={addTodoHandler}
  />;
};

export default TodoController;
