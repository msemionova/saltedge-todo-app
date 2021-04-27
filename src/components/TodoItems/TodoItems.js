import React from 'react';
import classes from './TodoItems.module.scss';
import TodoItem from './TodoItem/TodoItem';
import TodoForm from '../../containers/TodoForm/TodoForm';

const TodoItems = props => {
  let todos = <div className={classes.Empty} data-testid='todo-list-empty'>
    The list is empty... Add something.
  </div>

  if (props.todos.length) {
    todos = props.todos.map((todo, index) => (
      <TodoItem
        id={todo.id}
        key={todo.id}
        todo={todo}
        index={index}
      />));
    todos = <div data-testid='todo-list'>{todos}</div>
  }

  return (
    <div className={classes.TodoList}>
      <h1 data-testid='heading'>TODOs:</h1>
      <div className={classes.Container} data-testid='container'>
        <TodoForm />
        {todos}
      </div>
    </div>
  )
}

export default TodoItems;
