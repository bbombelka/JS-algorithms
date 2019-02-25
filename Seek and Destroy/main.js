import destroyer from './algorithms/version1.js';
import destroyerTwo from './algorithms/version2.js';
import destroyerThree from './algorithms/version3.js';
import destroyerFour from './algorithms/version4.js';

// DOM elements

const resultDiv = document.getElementById('result');
const destroyBtn = document.querySelector('.destroy');
const firstArgument = document.getElementById('first-arg');
const secondArgument = document.getElementById('second-arg');
const firstErrorSpan = document.getElementById('error-first');
const secondErrorSpan = document.getElementById('error-second');
const missionSelection = document.querySelector('select');
const codePrev = [...document.querySelectorAll('.selection')];

// variables

const functions = {
  attemptOne: destroyer,
  attemptTwo: destroyerTwo,
  attemptThree: destroyerThree,
  attemptFour: destroyerFour,
};

let first;
let second;
let selected = functions.attemptOne;

// parsing the arguments

function parse(str) {
  return str
    .split(/,/)
    .map(elem => (/\d/gi.test(elem) && /[^A-Z]/gi.test(elem) ? parseInt(elem, 10) : elem));
}

//-- event listeners

missionSelection.addEventListener('change', e => {
  codePrev.filter(code => code.classList.contains('visible'))[0].classList.remove('visible');

  codePrev.filter(code => code.id === e.target.value)[0].classList.add('visible');

  selected = functions[e.target.value];
});

// validation

firstArgument.addEventListener('blur', () => {
  firstArgument.value.length === 0
    ? (firstErrorSpan.textContent = 'Enter at least one element')
    : (firstErrorSpan.textContent = '');
});

secondArgument.addEventListener('blur', () => {
  secondArgument.value.length === 0
    ? (secondErrorSpan.textContent = 'Enter at least one element')
    : (secondErrorSpan.textContent = '');
});

destroyBtn.addEventListener('click', e => {
  e.preventDefault();

  if (firstArgument.value.length === 0 && secondArgument.value.length === 0) {
    firstErrorSpan.textContent = 'Enter at least one element';
    secondErrorSpan.textContent = 'Enter at least one element';
    return;
  } else if (firstArgument.value.length === 0 && secondArgument.value.length !== 0) {
    firstErrorSpan.textContent = 'Enter at least one element';
    return;
  } else if (firstArgument.value.length !== 0 && secondArgument.value.length === 0) {
    secondErrorSpan.textContent = 'Enter at least one element';
    return;
  }

  first = parse(firstArgument.value);
  second = parse(secondArgument.value);

  firstArgument.value = '';
  secondArgument.value = '';

  selected(first, ...second).length === 0
    ? (resultDiv.textContent = 'You destroyed everything !')
    : (resultDiv.textContent = selected(first, ...second));
});
