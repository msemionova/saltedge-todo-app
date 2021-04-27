import React from 'react';
import classes from './Button.module.scss';

const button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
    data-testid={props.testId}
  >{props.children}</button>
);

export default button;
