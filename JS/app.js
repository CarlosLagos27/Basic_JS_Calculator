let currentInput = '';
let previousInput = '';
let operator = ''; 

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('#btn-number');
const operationButtons = document.querySelectorAll('#btn-operation');
const clearButton = document.querySelector('#btn-clear');
const equalButton = document.querySelector('#btn-equal');

function initCalculator() {
    addNumberListeners();
    addOperationListeners();
    addEqualListener();
    addClearListener();
}

function addNumberListeners() {
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleNumberInput(button.textContent);
        });
    });
}

function handleNumberInput(number) {
    if (currentInput.length < 10) { 
        currentInput += number; 
        display.value = currentInput; 
    }
}


function addOperationListeners() {
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleOperator(button.textContent);
        });
    });
}

function handleOperator(selectorOperator){
    if (currentInput === '' && previousInput === '') return;
    if (previousInput !== ''){
        calculate();
        updateDisplay(currentInput);
    }
    operator = selectorOperator;
    previousInput = currentInput; 
    currentInput = '';
}

function calculate(){
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch(operator){
        case '+':
            currentInput = (num1 + num2).toString();
        break;
        case '-':
            currentInput = (num1 - num2).toString();    
        break;
        case '*':
            currentInput = (num1 * num2).toString();
        break;
        case '/':
            currentInput = num2 !== 0 ? (num1/num2).toString(): 'Error';
        break;
        default:
            break;
    }
}

function addEqualListener(){
    equalButton.addEventListener('click', () => {
        if(currentInput && previousInput ){
            calculate();
            updateDisplay(currentInput);
            resetStateAfterEqual();
        }
    });
}

function resetStateAfterEqual(){
    previousInput = '';
    operator = '';
}

function addClearListener(){
    clearButton.addEventListener('click', () => {
        clearCalculator();
    });
}

function clearCalculator(){
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('');
}

function updateDisplay(value){
    display.value = value;
}

initCalculator();