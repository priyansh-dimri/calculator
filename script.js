const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  console.log(num2);
  if(num2 === 0) return 'LOL';
  return num1 / num2;
};

let num1, num2, operator, number_to_be_added = 1;

const numeric_button_values = {
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
};

const operator_button_values = {
  'add': '+',
  'subtract': '-',
  'multiply': '*',
  'divide': '/',
}

const operate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "ERROR";
  }
};

const inputButtons = document.querySelectorAll('.input');
const calculatorDisplay = document.querySelector('#calculator-display');

const modifyCurrentNumber = (toBeAdded) => {
  if(number_to_be_added === 1){
    if(!num1) num1 = 0;
    num1 = (num1 * 10) + toBeAdded;
    modifyCalculatorDisplay(num1);
  }
  else{
    if(!num2) num2 = 0;
    num2 = (num2 * 10) + toBeAdded;
    modifyCalculatorDisplay(num2);
  }
}

const roundDisplayNumber = (toDisplay) => {
  if(isNaN(toDisplay)) return toDisplay;
  let display_string = toDisplay.toString();

  if(!display_string.includes('.')) return toDisplay;
  return toDisplay.toFixed(5);
}

const modifyCalculatorDisplay = (toDisplay) => {
  calculatorDisplay.textContent = roundDisplayNumber(toDisplay);
}

const inputsValid = () => {
  return (num1 !== undefined) && (num2 !== undefined) && (operator !== undefined);
}

const handleButtonClick = (buttonId) => {
  if(buttonId === 'ac') {
    num1 = num2 = operator = undefined;
    number_to_be_added = 1;

    modifyCalculatorDisplay('');
  }
  else if(buttonId === 'equals') {
    if(inputsValid()) {
      let result = operate(num1, num2, operator);
      modifyCalculatorDisplay(result);

      if(result === 'LOL') {
        num1 = undefined;
        number_to_be_added = 1;
      }

      num2 = operator = undefined;
    }
  }
  else if(buttonId in numeric_button_values) {
    let number_pressed = numeric_button_values[buttonId];
    modifyCurrentNumber(number_pressed);
  }
  else if(buttonId in operator_button_values) {
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
      operator = operator_button_values[buttonId];
      number_to_be_added = 2;
    }
  }
}

inputButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleButtonClick(button.id);
  })
})