// Get all the calculator buttons
const buttons = document.querySelectorAll('.btn');

// Get the display element
const display = document.querySelector('h1');

// Initialize the current calculation variables
let firstOperand = '';
let secondOperand = '';
let operator = '';
let shouldResetDisplay = false;
buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent;
      button.classList.add('glow'); // Add "glow" class
      setTimeout(() => {
        button.classList.remove('glow'); // Remove "glow" class after a delay
      }, 200);
  
      // Rest of your code...
    });
});

const updateDisplay = () => {
    let result = firstOperand + operator + secondOperand;
  
    // Check if the result has a decimal point
    if (Number.isFinite(parseFloat(result)) && result.includes('.')) {
      const decimalPart = result.split('.')[1];
  
      // Check if the decimal part consists of only zeros
      if (/^0*$/.test(decimalPart)) {
        result = (parseFloat(result) / 1).toString();
      } else {
        result = parseFloat(result).toFixed(4).replace(/\.?0+$/, '');
      }
    }
  
    display.textContent = result;
  };
  
// Function to clear the calculator
const clearCalculator = () => {
  firstOperand = '';
  secondOperand = '';
  operator = '';
  shouldResetDisplay = false;
  updateDisplay();
  display.textContent = '0'; // Set display to zero
};

// Function to handle number button clicks
const handleNumberClick = (number) => {
  if (shouldResetDisplay) {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    shouldResetDisplay = false;
  }

  if (operator === '') {
    firstOperand += number;
  } else {
    secondOperand += number;
  }

  updateDisplay();
};

// Function to handle operator button clicks
const handleOperatorClick = (operatorValue) => {
  if (shouldResetDisplay) {
    operator = '';
    shouldResetDisplay = false;
  }

  if (firstOperand !== '' && secondOperand !== '') {
    calculate();
  }

  operator = operatorValue;
  updateDisplay();
};

// Function to perform the calculation
const calculate = () => {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);
  
    switch (operator) {
      case '+':
        firstOperand = (first + second).toFixed(4);
        break;
      case '-':
        firstOperand = (first - second).toFixed(4);
        break;
      case 'x':
        firstOperand = (first * second).toFixed(4);
        break;
      case '/':
        firstOperand = (first / second).toFixed(4);
        break;
      case '%':
        firstOperand = ((first * second) / 100).toFixed(4);
        break;
      default:
        return;
    }
  
    secondOperand = '';
    operator = '';
  };

// Function to handle equal button click
const handleEqualClick = () => {
  if (firstOperand !== '' && secondOperand !== '') {
    calculate();
    shouldResetDisplay = true;
    updateDisplay();
  }
};

// Function to handle decimal button click
const handleDecimalClick = () => {
  if (shouldResetDisplay) {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    shouldResetDisplay = false;
  }

  if (operator === '') {
    if (!firstOperand.includes('.')) {
      firstOperand += '.';
    }
  } else {
    if (!secondOperand.includes('.')) {
      secondOperand += '.';
    }
  }

  updateDisplay();
};

// Function to handle AC button click
const handleACClick = () => {
  clearCalculator();
};

// Add click event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (buttonText >= '0' && buttonText <= '9') {
      handleNumberClick(buttonText);
    } else if (buttonText === '.') {
      handleDecimalClick();
    } else if (buttonText === 'AC') {
      handleACClick();
    } else if (buttonText === '=') {
      handleEqualClick();
    } else {
      handleOperatorClick(buttonText);
    }
  });
});
