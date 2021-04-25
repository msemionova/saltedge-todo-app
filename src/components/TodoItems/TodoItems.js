import React from 'react';
import classes from './TodoItems.module.scss';
import TodoItem from './TodoItem/TodoItem';
import TodoForm from '../../containers/TodoFrom';

const todoItems = props => {
  let todos = <div className={classes.Empty}>
    Todo list is empty...
    Add something.
  </div>

  if (props.todos.length) {
    todos = props.todos.map(todo => (
      <TodoItem
        id={todo.id}
        key={todo.id}
        todo={todo}
        changed={(event)=>props.changed(event, todo.id)}
        deleted={(event)=>props.deleted(event, todo.id)}
      />));
  }

  return (
    <div className={classes.TodoList}>
      <h1>TODOs:</h1>
      <div className={classes.Container}>
        <TodoForm added={props.added}/>
        {todos}
      </div>
    </div>
  )
}

export default todoItems;
