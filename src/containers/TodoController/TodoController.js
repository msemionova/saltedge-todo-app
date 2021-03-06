import React, { useState, useEffect } from 'react';
import TodoItems from '../../components/TodoItems/TodoItems';

const TodoController = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const latestTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(latestTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodoHandler = (event, value) => {
    event.preventDefault();
    setTodos([...todos, {
      id: Date.now(),
      title: value,
      checked: false
    }]);
  };

  const toggleTodoHandler = (event, id) => {
    event.preventDefault();
    if (event.type === 'change' || event.type === 'click' || event.key === "Enter") {
      setTodos(todos.map(todo => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
        return todo;
      }));
    }
  };

  const deleteTodoHandler = (event, id) => {
    event.stopPropagation();
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return <TodoItems
            todos={todos}
            added={addTodoHandler}
            changed={toggleTodoHandler}
            deleted={deleteTodoHandler}
          />;
};

export default TodoController;
