/* Permutations

 This algorithm is designed to produce all possible permutations without repetition of given string.
 It works on unique values therefore result of 12 will be te same as of 1222221212121
 Careful with length of input parameter. Values higher than 10 require a lot of computing power and may block or crash the browser
 
 how to use -> permutations('123')
*/

const permutations = inputStringWithCharacters => {
  const getUniqueCharacters = characters => Array.from(new Set(characters));

  const changeInputIntoArray = () => getUniqueCharacters(inputStringWithCharacters.split(''));

  const countPermutations = numOfCharacters => {
    let iterator = numOfCharacters;
    const numbersToReduce = [];
    while (iterator > 0) {
      numbersToReduce.push(iterator);
      iterator--;
    }
    return numbersToReduce.reduceRight((acc, curr) => acc * curr);
  };

  const createTwoDimArray = (numOfChars, numOfArrays) => {
    const result = [];
    let iterator = numOfArrays;

    while (iterator > 0) {
      const arr = [];
      arr.length = numOfChars;
      result.push(arr.fill(null, 0, numOfChars));
      iterator--;
    }

    return result;
  };

  const main = (inputCharacters, twoDimArray, row = 0) => {
    const characters = inputCharacters;
    actualVerticalFill(twoDimArray, characters, row);

    characters.forEach(character => {
      const restCharacters = characters.filter(char => char !== character);
      if (restCharacters.length) {
        const row = initialCharacters.length - restCharacters.length;
        const filteredTwoDimArray = twoDimArray.filter(
          arr => arr.includes(character) && arr.includes(null),
        );
        main(restCharacters, filteredTwoDimArray, row);
      }
    });
  };

  const actualVerticalFill = (twoDimArray, characters, row = 0) => {
    let numberOfEachCharacter = twoDimArray.length / characters.length;
    let currentCharacterIndex = 0;

    for (let i = 0; i < twoDimArray.length; i++) {
      if (numberOfEachCharacter === 0) {
        numberOfEachCharacter = twoDimArray.length / characters.length;
        currentCharacterIndex++;
      }
      numberOfEachCharacter--;
      twoDimArray[i][row] = characters[currentCharacterIndex];
    }
  };

  const initialCharacters = changeInputIntoArray();
  const numberOfPermutations = countPermutations(initialCharacters.length);
  const resultativeArray = createTwoDimArray(initialCharacters.length, numberOfPermutations);
  main(initialCharacters, resultativeArray);

  return resultativeArray.map(item => item.join(''));
};
