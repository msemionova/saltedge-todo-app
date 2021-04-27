import React from 'react';
import classes from './Input.module.scss';

const input = props => {
  let visibleClass = '';
  let invalidClass = '';
  let errorMessage = props.errorMessage || localStorage.getItem('lastErrorMessage');

  if (props.invalid && props.touched) {
    localStorage.setItem('lastErrorMessage', props.errorMessage);
    visibleClass = 'Visible';
    invalidClass = 'Invalid';
  }

  let validationError = <p
    data-testid='error-message'
    className={[classes.ValidationError, classes[visibleClass]].join(' ')}>{errorMessage}
  </p>

  return <>
    {validationError}
    <input
      data-testid={props.testId}
      type={props.type}
      className={[classes.Input, classes[invalidClass]].join(' ')}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.changed}
    />
  </>
};

export default input;
