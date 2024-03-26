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

function notValid() {
    return isNaN(+currentOutput.textContent) && !(currentOutput.textContent === '.');
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
    if (notValid()) return;
    if (number === '.' && currentOutput.textContent.includes('.')) return;

    if ((currentOutput.textContent === '0') && !(number === '.')) {
        currentOutput.textContent = number;
    }
    else {
        currentOutput.textContent += number;
    }
}

function setOperator(newOperator) {
    if (notValid()) return;
    if (currentOutput.textContent !== '') {
        if (operator !== null) {
            calculate();
        }
        operand1 = currentOutput.textContent;
        operator = newOperator;
        currentOutput.textContent = '';
        previousOutput.textContent = `${operand1} ${operator}`;
    }
}

function calculate() {
    if (currentOutput.textContent === '' || operator === null || notValid()) return;
    if (currentOutput.textContent === '0' && operator === '/') {
        previousOutput.textContent = 'WHY!?! ... Press AC';
        currentOutput.textContent = 'BOOM!';
        return;
    }

    operand2 = currentOutput.textContent;
    currentOutput.textContent = Math.round(operate(operand1, operator, operand2) * 1000) / 1000;
    previousOutput.textContent = `${operand1} ${operator} ${operand2} =`;
    operator = null;
}

function clear() {
    currentOutput.textContent = '0';
    previousOutput.textContent = '';
    operand1 = '';
    operand2 = '';
    operator = null;
}

function deleteLast() {
    if (notValid()) return;
    if (currentOutput.textContent.length === 1) {
        currentOutput.textContent = '0';
    }
    else {
        currentOutput.textContent = currentOutput.textContent.slice(0, -1);
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.getAttribute('data-number'));
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        setOperator(button.getAttribute('data-operator'));
    });
});

deleteButton.addEventListener('click', deleteLast);
allClearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', calculate);

/* Keyboard support */
window.addEventListener('keydown', (event) => {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        appendNumber(key);
    }
    else if (['/', '*', '-', '+'].includes(key)) {
        if (currentOutput.textContent !== '' && operator === null) {
            operand1 = currentOutput.textContent;
            operator = key;
            currentOutput.textContent = '';
            previousOutput.textContent = `${operand1} ${operator}`;
        }
    }
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    else if (key === 'Backspace' || key === 'Delete') {
        deleteLast();
    }
    else if (key === 'Escape') {
        clear();
    }
});