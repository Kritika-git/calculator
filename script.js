let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

const buttons = document.querySelectorAll('button');

// Update the display with the current displayValue
function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue.length > 9 ? displayValue.substring(0, 9) : displayValue;
}

// Reset calculator to its initial state
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

// Check if a button is an operand
function isOperand(button) {
    return button.classList.contains('operand');
}

// Check if a button is an operator
function isOperator(button) {
    return button.classList.contains('operator');
}

// Handle operand input
function handleOperandInput(operand) {
    if (firstOperator === null) {
        displayValue = displayValue === '0' ? operand : displayValue + operand;
    } else {
        displayValue = displayValue === firstOperand ? operand : displayValue + operand;
    }
}

// Handle operator input
function handleOperatorInput(operator) {
    if (firstOperator && !secondOperator) {
        secondOperator = operator;
        secondOperand = displayValue;
        performCalculation();
    } else if (firstOperator && secondOperator) {
        secondOperand = displayValue;
        performCalculation();
        secondOperator = operator;
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

// Perform the calculation
function performCalculation() {
    const x = Number(firstOperand);
    const y = Number(secondOperand);
    const op = secondOperator || firstOperator;

    result = operate(x, y, op);
    displayValue = result === 'lmao' ? 'Error' : roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = null;
}

// Handle equals button
function handleEquals() {
    if (!firstOperator) return;

    secondOperand = displayValue;
    performCalculation();

    firstOperator = null;
    secondOperator = null;
}

// Handle decimal input
function handleDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue = displayValue === firstOperand || displayValue === secondOperand ? '0' + dot : displayValue + dot;
    }
}

// Handle percentage input
function handlePercent() {
    displayValue = (Number(displayValue) / 100).toString();
}

// Handle sign toggle
function handleSignToggle() {
    displayValue = (Number(displayValue) * -1).toString();
}

// Add event listeners to buttons
function addEventListeners() {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (isOperand(button)) {
                handleOperandInput(button.value);
            } else if (isOperator(button)) {
                handleOperatorInput(button.value);
            } else if (button.classList.contains('equals')) {
                handleEquals();
            } else if (button.classList.contains('decimal')) {
                handleDecimal(button.value);
            } else if (button.classList.contains('percent')) {
                handlePercent();
            } else if (button.classList.contains('sign')) {
                handleSignToggle();
            } else if (button.classList.contains('clear')) {
                resetCalculator();
            }
            updateDisplay();
        });
    });
}

// Perform basic arithmetic operations
function operate(x, y, op) {
    switch (op) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        case '/': return y === 0 ? 'lmao' : x / y;
        default: return null;
    }
}

// Round numbers accurately
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

// Initialize the calculator
resetCalculator();
updateDisplay();
addEventListeners();
