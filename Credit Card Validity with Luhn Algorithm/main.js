/* Check Input Content For Valid Credit Card Number 
    uses Luhn algorithm
    more on subject https://romek.info/ut/banki.html
    
    looks for 16 digit number regardless of hyphens whitespaces etc.
    checks bin validity (for simplicity gave just a couple)
    if these conditions are met number of card is verified by Luhn algorithm

    'Cathy Berx, burmistrz Antwerpii, jest przekonana, że winę za nagły wzrost zachorowań na Covid-19 w największym 
    mieście 5488 6483 3568 5877 Flandrii ponoszą władze federalne Belgii: nie przekazały na czas informacji, które 
    pozwoliłyby 4160 3903 2478 0029 na powstrzymanie pandemii. Co prawda od  1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 2 pięciu 
    dni w półmilionowej portowej metropolii obowiązuje godzina policyjna, ale wirus już wymknął się spod kontroli i 
    znowu podbija cały kraj. Liczba zarażonych w czterokrotnie mniej zaludnionej od Polski Belgii przekracza 500 dziennie,
     a łączna liczba zmarłych dochodzi do 10 tys.'

*/

const checkInputContentForValidCreditCardNumber = (inputText) => {
  let textWithMaskedCardNumber = inputText;

  const removeUnnecessaryChars = (text) => {
    return text.replace(/[^A-Za-z\d]/g, '');
  };

  const findProbableCardNumbers = (text) => {
    const contains16DigitNumber = /\d{16}/g.test(text);
    if (contains16DigitNumber) return text.match(/\d{16}/g);
  };

  const checkBinCompliancy = (probableCardNumbers) => {
    return probableCardNumbers.filter((cardNumber) =>
      binEnum.some((binNumber) => cardNumber.startsWith(binNumber))
    );
  };

  const verifyWithLuhnAlg = (probableCardNumbers) => {
    const getSumOfDigits = (number) => {
      return String(number)
        .split('')
        .map((number) => parseInt(number))
        .reduce((acc, curr) => acc + curr);
    };

    const transformFactorTwoNumbers = (numbers) => {
      return numbers.map((number) => {
        const doubledNumber = number * 2;
        return doubledNumber > 9
          ? getSumOfDigits(doubledNumber)
          : doubledNumber;
      });
    };

    return probableCardNumbers.map((probableCardNumber) => {
      const numbersWithFactorTwo = probableCardNumber
        .split('')
        .filter((_, index) => index % 2 === 0);
      const numbersWithFactorOne = probableCardNumber
        .split('')
        .filter((_, index) => index % 2 === 1);

      const sum = getSumOfDigits(
        [
          ...transformFactorTwoNumbers(numbersWithFactorTwo),
          ...numbersWithFactorOne,
        ].join('')
      );

      return { probableCardNumber, valid: String(sum).endsWith('0') };
    });
  };

  const maskNumber = (cardNumber) => {
    const mask = '**** ';
    const secondPart = cardNumber.substring(4, 8);
    const thirdPart = cardNumber.substring(8, 12);
    const suffix = cardNumber.substring(12, 16);

    const secondPartRegex = new RegExp(
      `${secondPart}(?=${thirdPart}|[\\s]*${thirdPart})`
    );
    const thirdPartRegex = new RegExp(
      `${thirdPart}(?=${suffix}|[\\s]*${suffix})`
    );

    textWithMaskedCardNumber = textWithMaskedCardNumber
      .replace(secondPartRegex, ' ' + mask)
      .replace(thirdPartRegex, mask);
  };

  const processedText = removeUnnecessaryChars(inputText);
  const probableCardNumbers = findProbableCardNumbers(processedText);

  if (!probableCardNumbers) {
    return;
  }

  const binCompliantNumbers = checkBinCompliancy(probableCardNumbers);

  if (binCompliantNumbers.length) {
    const creditCards = verifyWithLuhnAlg(binCompliantNumbers);
    if (creditCards) {
      const validCreditCards = creditCards.filter((card) => card.valid);
      if (validCreditCards.length) {
        validCreditCards.forEach(({ probableCardNumber }) =>
          maskNumber(probableCardNumber)
        );
      }
      return textWithMaskedCardNumber;
    }
  }
};

const binEnum = ['416039', '535817', '527003', '552956', '123456', '424671'];
