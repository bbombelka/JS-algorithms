function primeFactors(number) {
  const divisors = [];

  let currentPrime = 2;
  let decomposedNumber = number;

  while (decomposedNumber > 1) {
    if (decomposedNumber % currentPrime !== 0) {
      currentPrime = getNextPrime(currentPrime);
    } else {
      decomposedNumber = decomposedNumber / currentPrime;
      divisors.push(currentPrime);
    }
  }

  return formatResult(divisors);
}

function getNextPrime(startNumber) {
  let number = startNumber + 1;
  const isPrimeNumber = isPrime(number);

  if (isPrimeNumber) {
    return number;
  } else {
    return getNextPrime(number);
  }
}

function isPrime(num) {
  if (num <= 3) return num > 1;

  if (num % 2 === 0 || num % 3 === 0) return false;

  let count = 5;

  while (Math.pow(count, 2) <= num) {
    if (num % count === 0 || num % (count + 2) === 0) return false;

    count += 6;
  }

  return true;
}

function formatResult(divisors) {
  return Array.from(new Set(divisors))
    .map((uniqueDivisorNumber) => {
      const numOfDivisors = divisors.filter((num) => num === uniqueDivisorNumber).length;

      return numOfDivisors > 1 ? `(${uniqueDivisorNumber}**${numOfDivisors})` : `(${uniqueDivisorNumber})`;
    })
    .reduce((accum, curr) => accum + curr);
}
