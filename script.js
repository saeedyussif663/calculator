const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
// Replace current display value if first value is entered
if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
} else {
    // if current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}
}

function addDecimal() {
    // if operator pressed, don't add decimal
    if (awaitingNextValue) return;
    // if no decimal add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// calculator first and sencond values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
}

function useOperator(operator) {
    // prevent multiple operators
    if (operatorValue && awaitingNextValue){
        operatorValue = operator;
         return
        };
    const currentValue = Number(calculatorDisplay.textContent);
    //  assign first if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else{
        console.log(firstValue,operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

//  Add eventlistners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }  else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset all values, display
function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;

}

// Event listner
clearBtn.addEventListener('click', resetAll);