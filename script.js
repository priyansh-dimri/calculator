const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

let num1, num2, operator;

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