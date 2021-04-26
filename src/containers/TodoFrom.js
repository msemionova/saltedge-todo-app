import React, { useState } from 'react';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: 'Min length: 5 characters',
  MAX_LENGTH: 'Max length: 100 characters'
}

const TodoForm = props => {
  const initialState = {
    value: '',
    validation: {
      valid: false,
      touched: false,
      minLength: 5,
      maxLength: 100,
      required: true,
      errorMessage: ''
    }
  };

  const [inputState, setInputState] = useState(initialState);

  const generateErrorMessage = (value, rules) => {
    if (value.trim() === '') {
      return ERROR_MESSAGES.REQUIRED;
    } else if (value.length <= rules.minLength) {
      return ERROR_MESSAGES.MIN_LENGTH;
    } else if (value.length >= rules.maxLength) {
      return ERROR_MESSAGES.MAX_LENGTH;
    } else {
      return '';
    }
  }

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  const inputChangedHandler = event => {
    const updatedState = {
      value: event.target.value,
      validation: {...inputState.validation}
    }
    updatedState.validation.touched = true;
    updatedState.validation.valid = checkValidity(updatedState.value, updatedState.validation);
    updatedState.validation.errorMessage = generateErrorMessage(updatedState.value, updatedState.validation);
    setInputState(updatedState);
  }

  const todoAddedHandler = (event, value) => {
    props.added(event, value);
    setInputState(initialState);
  }

  return (
    <form onSubmit={(event) => todoAddedHandler(event, inputState.value)}>
      <Input
        value={inputState.value}
        changed={(event) => inputChangedHandler(event)}
        invalid={!inputState.validation.valid}
        touched={inputState.validation.touched}
        errorMessage={inputState.validation.errorMessage}
      />
      <Button
        disabled={!inputState.validation.valid}
        clicked={(event) => todoAddedHandler(event, inputState.value)}
        btnType='Add'
      >
        <svg>
          <use xlinkHref="saltedge-todo-app/symbol-defs.svg#icon-plus-square" />
        </svg>
        ADD
      </Button>
    </form>
  );
}

export default TodoForm;
