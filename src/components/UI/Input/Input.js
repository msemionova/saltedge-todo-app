import React from 'react';
import classes from './Input.module.scss';

const input = props => {
  let errorMessage = props.errorMessage || localStorage.getItem('lastErrorMessage');
  const inputClasses = [classes.Input];
  const errorMessageClasses = [classes.ValidationError];
  let validationError = <p className={errorMessageClasses.join(' ')}>{errorMessage}</p>

  if (props.invalid && props.touched) {
    localStorage.setItem('lastErrorMessage', props.errorMessage);
    inputClasses.push(classes.Invalid);
    errorMessageClasses.push(classes.Visible);
    validationError = <p className={errorMessageClasses.join(' ')}>{errorMessage}</p>
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
