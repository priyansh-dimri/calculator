const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  console.log(num2);
  if(num2 === 0) return 'LOL';
  return num1 / num2;
};

let num1 , num2 , operator, number_to_be_added = 1;

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

const operator_button_values = {
  'add': '+',
  'subtract': '-',
  'multiply': '*',
  'divide': '/',
}

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
    if(!num1) num1 = "";
    num1 += toBeAdded;
    modifyCalculatorDisplay(num1);
  }
  else{
    if(!num2) num2 = "";
    num2 += toBeAdded;
    modifyCalculatorDisplay(num2);
  }
}

const roundDisplayNumber = (toDisplay) => {
  if(isNaN(toDisplay)) return toDisplay;

  if(!toDisplay.includes('.')) return toDisplay;

  let display_num = Number(toDisplay);
  return display_num.toFixed(5).toString();
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
      }
      else {
        num1 = result;
      }

      number_to_be_added = 1;
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