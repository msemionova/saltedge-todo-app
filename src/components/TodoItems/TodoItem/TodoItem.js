import React from "react";
import classes from './TodoItem.module.scss';
import Button from '../../UI/Button/Button';

const TodoItem = props => {
  const checkedClass = props.todo.checked ? 'CheckedItem' : '';
  const combinedClasses = [classes.TodoItem, classes.FadeIn, classes[checkedClass]];

  return <>
    <div
      className={combinedClasses.join(' ')}
      onClick={(event) => props.changed(event, props.todo.id)}
    >
      <label className={classes.Container}>{props.todo.title}
        <input
          type='checkbox'
          onKeyPress={props.changed}
          onChange={props.changed}
          checked={props.todo.checked}
          data-testid={'checkbox-' + props.index}
        />
        <span className={classes.Checkmark}/>
      </label>
      <Button
        btnType='Delete'
        clicked={(event) => props.deleted(event, props.todo.id)}
        testId={'delete-btn-' + props.index}>
        <svg>
          <use xlinkHref='symbol-defs.svg#icon-trash' />
        </svg>
      </Button>
    </div>
  </>;
};

export default TodoItem;
