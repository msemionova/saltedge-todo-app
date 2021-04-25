import React from 'react';
import classes from './Input.module.scss';

const input = props => {
  let validationError = <p className={classes.ValidationError}></p>;
  const inputClasses = [classes.Input];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>
  }

  return <>
    {validationError}
    <input
      type='text'
      className={inputClasses.join(' ')}
      value={props.value}
      placeholder='Add a TODO...'
      onChange={props.changed}
    />
  </>
};

export default input;
