import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

export const INPUT_CONFIG = {
  DEFAULT_VALUE: '',
  PLACEHOLDER: 'Add a TODO...',
  TYPE: 'text',
  MIN_LENGTH: 5,
  MAX_LENGTH: 100
};

export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: `Min length: ${INPUT_CONFIG.MIN_LENGTH} characters`,
  MAX_LENGTH: `Max length: ${INPUT_CONFIG.MAX_LENGTH} characters`
};

const TEST_IDS = {
  INPUT: 'todo-input',
  BUTTON: 'add-todo-btn',
  FORM: 'todo-form'
};

const ICON_PLUS = 'symbol-defs.svg#icon-plus-square';
const BTN_ADD = 'Add';

const TodoForm = props => {
  const initialState = {
    value: INPUT_CONFIG.DEFAULT_VALUE,
    config: {
      placeholder: INPUT_CONFIG.PLACEHOLDER,
      type: INPUT_CONFIG.TYPE,
    },
    validation: {
      minLength: INPUT_CONFIG.MIN_LENGTH,
      maxLength: INPUT_CONFIG.MAX_LENGTH,
      valid: false,
      touched: false,
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
      config: {...inputState.config},
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
    <form onSubmit={(event) => todoAddedHandler(event, inputState.value)}
          data-testid={TEST_IDS.FORM}>
      <Input
        value={inputState.value}
        placeholder={inputState.config.placeholder}
        type={inputState.config.type}
        changed={(event) => inputChangedHandler(event)}
        invalid={!inputState.validation.valid}
        touched={inputState.validation.touched}
        errorMessage={inputState.validation.errorMessage}
        testId={TEST_IDS.INPUT}
      />
      <Button
        disabled={!inputState.validation.valid}
        clicked={(event) => todoAddedHandler(event, inputState.value)}
        btnType={BTN_ADD}
        testId={TEST_IDS.BUTTON}
      >
        <svg>
          <use xlinkHref={ICON_PLUS} />
        </svg>
        ADD
      </Button>
    </form>
  );
}

export default TodoForm;
