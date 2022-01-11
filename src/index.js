const input = document.querySelector('input');
const btns = document.querySelectorAll('.btn');
const outIcon = document.querySelector('#out-item');
const btnResult = document.querySelector('#result');
const outResult = document.querySelector('#out-result');
const btnReset = document.querySelector('#reset');

const plusWorker = new Worker('./src/plus.js');
const minusWorker = new Worker('./src/minus.js');
const multiplyWorker = new Worker('./src/multiply.js');
const divisionWorker = new Worker('./src/division.js');

let value1 = '';
let value2 = '';


input.focus();
input.addEventListener('input', () => {
    outResult.innerText = ''
});

btnResult.addEventListener('click', result);
btnReset.addEventListener('click', reset);

btns.forEach(item => {
    item.addEventListener('click', (e) => {
        if(!isNaN(input.value) && input.value) {
            value1 = +input.value;
            outIcon.innerText = e.target.dataset.item;
            input.value = '';
            input.focus();
        }
    })
});

function reset () {
    value1 = '';
    value2 = '';
    outResult.innerText = '';
    outIcon.innerText = '';
    input.value = ''

    input.focus();
}

function result () {
    if(!isNaN(input.value)) {
        value2 = +input.value;
    }
    if(!value1 || !value2) return;

    switch (outIcon.innerText) {
        case '+' : {
            plusWorker.postMessage([value1, value2]);

            plusWorker.onmessage = (e) => {
                outResult.innerText = e.data
                outIcon.innerText = '='
            }
            break;
        }
        case '-' : {
            minusWorker.postMessage([value1, value2]);

            minusWorker.onmessage = (e) => {
                outResult.innerText = e.data
                outIcon.innerText = '='
            }
            break;
        }
        case '*' : {
            multiplyWorker.postMessage([value1, value2]);

            multiplyWorker.onmessage = (e) => {
                outResult.innerText = e.data
                outIcon.innerText = '='
            }
            break;
        }
        case '/' : {
            divisionWorker.postMessage([value1, value2]);

            divisionWorker.onmessage = (e) => {
                outResult.innerText = e.data
                outIcon.innerText = '='
            }
            break;
        }
    }
}