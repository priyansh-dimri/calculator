const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if(num2 === 0) return 'LOL';
  return num1 / num2;
};

let num1 , num2 , operator, number_to_be_added = 1;

// Maps numeric button ids to the value of the button
const numeric_button_values = {
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};

// Maps operator button ids to the character equivalent of the operator
const operator_button_values = {
  'add': '+',
  'subtract': '-',
  'multiply': '*',
  'divide': '/',
}

// Array of supported operators of the calculator
const supported_operators = [
  '+',
  '-',
  '*',
  '/',
]

const operate = (num1, num2, operator) => {
  if(isNaN(num1) || isNaN(num2)) return 'LOL';
  num1 = Number(num1);
  num2 = Number(num2);

  let result;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      result = "ERROR";
  }

  return result.toString();
};

const inputButtons = document.querySelectorAll('.input');
const calculatorDisplay = document.querySelector('#calculator-display');

const modifyCurrentNumber = (toBeAdded) => {
  if(number_to_be_added === 1){
    if(num1 && exceedsDecimalLimit(num1)) return;
    if(!num1) num1 = "";
    num1 += toBeAdded;
    modifyCalculatorDisplay(num1);
  }
  else{
    if(num2 && exceedsDecimalLimit(num2)) return;
    if(!num2) num2 = "";
    num2 += toBeAdded;
    modifyCalculatorDisplay(num2);
  }
}

const addDecimalToCurrentNumber = () => {
  if(number_to_be_added === 1){
    if(!num1) num1 = "0";
    if(num1.includes('.')) return;
    num1 += '.';
    modifyCalculatorDisplay(num1);
  }
  else{
    if(!num2) num2 = "0";
    if(num2.includes('.')) return;
    num2 += '.';
    modifyCalculatorDisplay(num2);
  }
}

const exceedsDecimalLimit = (toDisplay) => {
  if(!toDisplay.includes('.')) return false;

  if(toDisplay.split('.')[1].length > 4) return true;
  return false;
}

const roundDisplayNumber = (toDisplay) => {
  if(isNaN(toDisplay)) return toDisplay;

  if(!exceedsDecimalLimit(toDisplay)) return toDisplay;

  let display_num = Number(toDisplay);
  return display_num.toFixed(5).toString();
}

const modifyCalculatorDisplay = (toDisplay) => {
  calculatorDisplay.textContent = roundDisplayNumber(toDisplay);
}

const inputsValid = () => {
  return (num1 !== undefined) && (num2 !== undefined) && (operator !== undefined);
}

const handleAllClearClick = () => {
  num1 = num2 = operator = undefined;
  number_to_be_added = 1;

  modifyCalculatorDisplay('');
}

const handleBackspaceClick = () => {
  if(number_to_be_added === 1){
    if(num1) {
      num1 = num1.slice(0, -1);
      modifyCalculatorDisplay(num1);
    }
  }
  else{
    if(num2) {
      num2 = num2.slice(0, -1);
      if(num2 === "") num2 = undefined;
      modifyCalculatorDisplay(num2);
    }
    else {
      operator = undefined;
      number_to_be_added = 1;
      modifyCalculatorDisplay(num1);
    }
  }
}

const handleEqualsClick = () => {
  if(inputsValid()) {
    let result = operate(num1, num2, operator);
    modifyCalculatorDisplay(result);

    if(result === 'LOL') {
      num1 = undefined;
    }
    else {
      num1 = result;
    }

    number_to_be_added = 1;
    num2 = operator = undefined;
  }
}

const handleOperatorClick = (operator_clicked) => {
  if(inputsValid()) {
    let result = operate(num1, num2, operator);
    modifyCalculatorDisplay(result);

    if(result === 'LOL') {
      num1 = num2 = operator = undefined;
      number_to_be_added = 1;
      return;
    }
    
    num1 = result;
    num2 = undefined;
  }

  if(num1 !== undefined){
    operator = operator_clicked;
    number_to_be_added = 2;
  }
}

const handleButtonClick = (buttonId) => {
  if(buttonId === 'ac') handleAllClearClick();
  else if(buttonId === 'decimal') addDecimalToCurrentNumber();
  else if(buttonId === 'backspace') handleBackspaceClick();
  else if(buttonId === 'equals') handleEqualsClick();
  else if(buttonId in numeric_button_values) modifyCurrentNumber(numeric_button_values[buttonId]);
  else if(buttonId in operator_button_values) handleOperatorClick(operator_button_values[buttonId]);
}

inputButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleButtonClick(button.id);
  })
})

// Keyboard support
document.addEventListener("keydown", (e) => {
  let pressed_key = e.key;

  if(pressed_key !== ' ' && !isNaN(pressed_key)) modifyCurrentNumber(pressed_key);
  else if(pressed_key === 'Backspace') handleBackspaceClick();
  else if(pressed_key === 'Enter') handleEqualsClick();
  else if(pressed_key === '.') addDecimalToCurrentNumber();
  else if(supported_operators.includes(pressed_key)) handleOperatorClick(pressed_key);
})