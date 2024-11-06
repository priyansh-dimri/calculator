const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

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

const modifyCalculatorDisplay = (toDisplay) => {
  calculatorDisplay.textContent = toDisplay;
}

const handleButtonClick = (buttonId) => {
  switch(buttonId) {
    case 'ac':
      modifyCalculatorDisplay('');
      break;
  }
}

inputButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleButtonClick(button.id);
  })
})