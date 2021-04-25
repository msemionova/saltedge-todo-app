import React from "react";
import classes from './TodoItem.module.scss';
import Button from '../../UI/Button/Button';

const todoItem = props => {
  const checkedClass = props.todo.checked ? 'CheckedItem' : '';
  return <>
    <div className={[classes.TodoItem, classes[checkedClass]].join(' ')} onClick={props.changed}>
      <label className={classes.Container}>{props.todo.title}
        <input type='checkbox' onKeyPress={props.changed} onChange={props.changed} checked={props.todo.checked}/>
        <span className={classes.Checkmark}/>
      </label>
      <Button btnType='Delete' clicked={props.deleted}>X</Button>
    </div>
  </>;
};

export default todoItem;
