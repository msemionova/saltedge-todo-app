import React, { useContext, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Context } from '../../context';

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

const BUTTON_TYPES = {
  ADD: 'Add'
};

const ICON_PLUS = 'symbol-defs.svg#icon-plus-square';

const TodoForm = props => {
  const initialValidation = {
    minLength: INPUT_CONFIG.MIN_LENGTH,
    maxLength: INPUT_CONFIG.MAX_LENGTH,
    valid: false,
    touched: false
  };
  const [value, setValue] = useState(INPUT_CONFIG.DEFAULT_VALUE);
  const [validation, setValidation] = useState(initialValidation);
  const [errorMessage, setErrorMessage] = useState('');
  const { addTodoHandler } = useContext(Context);

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
    isValid = value.trim() !== '' && isValid;
    isValid = value.length >= rules.minLength && isValid;
    isValid = value.length <= rules.maxLength && isValid;
    return isValid;
  };

  const inputChangedHandler = event => {
    const updatedValue = event.target.value;
    const isValid = checkValidity(updatedValue, validation);
    setErrorMessage(generateErrorMessage(updatedValue, validation));
    setValue(updatedValue);
    setValidation({
      ...validation,
      valid: isValid,
      touched: true
    });
  };

  const todoAddedHandler = (event, value) => {
    addTodoHandler(event, value);
    setValue(INPUT_CONFIG.DEFAULT_VALUE);
    setValidation(initialValidation);
    setErrorMessage('');
  }

  return (
    <form onSubmit={(event) => todoAddedHandler(event, value)} data-testid={TEST_IDS.FORM}>
      <Input
        value={value}
        placeholder={INPUT_CONFIG.PLACEHOLDER}
        type={INPUT_CONFIG.TYPE}
        changed={(event) => inputChangedHandler(event)}
        invalid={!validation.valid}
        touched={validation.touched}
        errorMessage={errorMessage}
        testId={TEST_IDS.INPUT}
      />
      <Button
        disabled={!validation.valid}
        clicked={(event) => todoAddedHandler(event, value)}
        btnType={BUTTON_TYPES.ADD}
        testId={TEST_IDS.BUTTON}
      >
        <svg>
          <use xlinkHref={ICON_PLUS} />
        </svg>
        {BUTTON_TYPES.ADD.toUpperCase()}
      </Button>
    </form>
  );
}

export default TodoForm;
