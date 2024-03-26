const previousOutput = document.querySelector('.previous-output');
const currentOutput = document.querySelector('.current-output');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsBtn');
const deleteButton = document.querySelector('#deleteBtn');
const allClearButton = document.querySelector('#allClearBtn');

let operand1 = '';
let operand2 = '';
let operator = null;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0) return null;
            return divide(num1, num2);
    }
}

function appendNumber(number) {
    if (number === '.' && currentOutput.textContent.includes('.')) return;

    if (currentOutput.textContent === '0' && !(number === '.')) {
        currentOutput.textContent = number;
    }
    else {
        currentOutput.textContent += number;
    }
}


function clear() {
    currentOutput.textContent = '0';
    previousOutput.textContent = '';
    operand1 = '';
    operand2 = '';
    operator = null;
}

function calculate() {
    if (operand1 === '' || operand2 === '' || operator === null) return;
    if (currentOutput.textContent === '0' && operator === '/') {
        previousOutput.textContent = 'WHAT HAVE YOU DONE!?! ... Press AC';
        currentOutput.textContent = 'BOOM!';
        return;
    }

    operand2 = currentOutput.textContent;
    currentOutput.textContent = Math.round(operate(operand1, operator, operand2) * 1000) / 1000;
    previousOutput.textContent = `${operand1} ${operator} ${operand2} =`;
    operator = null;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.getAttribute('data-number'));
    });
});

equalsButton.addEventListener('click', calculate);
allClearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', () => {
    if (currentOutput.textContent.length === 1) {
        currentOutput.textContent = '0';
    }
    else {
        currentOutput.textContent = currentOutput.textContent.slice(0, -1);
    }
});