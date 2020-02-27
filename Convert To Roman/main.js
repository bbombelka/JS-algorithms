// Roman Number Converter. Use convertToRomanNumber function with number input to see results.

const digitConverter = (number, characters) => {
  const digits = {
    1: () => characters[0],
    2: () => characters[0].repeat(2),
    3: () => characters[0].repeat(3),
    4: () => characters[0] + characters[1],
    5: () => characters[1],
    6: () => characters[1] + characters[0],
    7: () => characters[1] + characters[0].repeat(2),
    8: () => characters[1] + characters[0].repeat(3),
    9: () => characters[0] + characters[2],
    0: () => '',
  };

  return digits[number]();
};

const validateInput = input => {
  if (typeof input !== 'number') return 'Enter a valid number!';
  if (input < 1 || input > 3999) return 'Invalid input number. Pick one between 1 and 3999!';
};

const convertToRomanNumber = number => {
  const invalidity = validateInput(number);
  if (invalidity) return invalidity;

  const characters = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  const characterRange = [0, 3];
  number = String(number).split('');
  let result = '';

  for (let i = number.length; i > 0; i--) {
    result = `${digitConverter(
      Number(number[i - 1]),
      characters.slice(...characterRange),
    )}${result}`;
    characterRange.forEach((_, i, arr) => (arr[i] += 2));
  }

  return result;
};
