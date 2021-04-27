import React, {useContext} from "react";
import classes from './TodoItem.module.scss';
import Button from '../../UI/Button/Button';
import { Context } from '../../../context';

const TodoItem = props => {
  const { toggleTodoHandler, deleteTodoHandler } = useContext(Context);
  const checkedClass = props.todo.checked ? 'CheckedItem' : '';
  const combinedClasses = [classes.TodoItem, classes.FadeIn, classes[checkedClass]];

  return <>
    <div className={combinedClasses.join(' ')} onClick={(event) => toggleTodoHandler(event, props.id)}>
      <label className={classes.Container}>{props.todo.title}
        <input
          type='checkbox'
          onKeyPress={toggleTodoHandler}
          onChange={toggleTodoHandler}
          checked={props.todo.checked}
          data-testid={'checkbox-' + props.index}
        />
        <span className={classes.Checkmark}/>
      </label>
      <Button btnType='Delete' clicked={(event) => deleteTodoHandler(event, props.id)} testId={'delete-btn-' + props.index}>
        <svg>
          <use xlinkHref='symbol-defs.svg#icon-trash' />
        </svg>
      </Button>
    </div>
  </>;
};

export default TodoItem;
