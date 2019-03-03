// A functions that takes a string and displays the number of each character it contains

function count(string) {
  let arr = []; // array from string letters
  let resultTwo = [];
  let singleLetters = '';
  let result = {};
  let regExp;

  // - - - - - -
  arr = string.split('').map(letter => letter.charCodeAt());

  arr.map((elem, index, arr) => {
    if (resultTwo.indexOf(elem) == -1) resultTwo.push(elem);
  });

  resultTwo.sort((a, b) => a - b);

  resultTwo.map(elem => (singleLetters += String.fromCharCode(elem)));

  singleLetters.split('').map(letter => {
    let regExp = new RegExp(`${letter}`, `ig`);
    result[letter] = string.match(regExp).length;
  });

  return result;
}
