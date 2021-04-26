import React from "react";
import classes from './TodoItem.module.scss';
import Button from '../../UI/Button/Button';

const todoItem = props => {
  const checkedClass = props.todo.checked ? 'CheckedItem' : '';
  const combinedClasses = [classes.TodoItem, classes.FadeIn, classes[checkedClass]];

  return <>
    <div className={combinedClasses.join(' ')} onClick={props.changed}>
      <label className={classes.Container}>{props.todo.title}
        <input type='checkbox' onKeyPress={props.changed} onChange={props.changed} checked={props.todo.checked}/>
        <span className={classes.Checkmark}/>
      </label>
      <Button btnType='Delete' clicked={props.deleted}>
        <svg>
          <use xlinkHref='symbol-defs.svg#icon-trash' />
        </svg>
      </Button>
    </div>
  </>;
};

export default todoItem;
