let total = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if(isNaN(value)) {
    // this is not a number
        handleSymbol(value);
    } else {
    // this is a number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C': 
            buffer = '0';
            total = 0;
            break;
        case '=': 
            if(previousOperator === null) {
                // you need two numbers to do math
                return;
            } 
            flashOperation(parseInt(buffer));
            previousOperator = null;
            buffer = total;
            total = 0;
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '×': 
        case '÷':
        case '-':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if(buffer === '0') {
        // do nothing
        return;
    }
    var intBuffer = parseInt(buffer);

    if(total === 0) {
        total = intBuffer;
    } else {
        flashOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flashOperation(intBuffer) {
    if (previousOperator === '+') {
        total += intBuffer;
    } else if (previousOperator === '-') {
        total -= intBuffer;
    } else if (previousOperator === '×') {
        total *= intBuffer;
    } else {
        total /= intBuffer;
    } 
    console.log(total);
}

function handleNumber(numberSting) {
    if(buffer === '0') {
        buffer = numberSting;
    } else {
        buffer += numberSting;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', (e) => {
            buttonClick(e.target.innerText);
        });
}

init();