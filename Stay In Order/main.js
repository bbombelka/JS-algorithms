// Stay in Order. Algorithm prints out  given number of a and b characters (input number) in such order there could only be 2 consecutive same characters
// eg solution(4,10) returns "bbabbabbabbabb" and so on

const solution = (a, b) => {
  if (Math.max(a, b) - Math.min(a, b) > Math.min(a, b) + 2) return 'Invalid parameters';

  let stringALength = a;
  let stringBLength = b;
  let result = '';

  do {
    while (stringALength > 0) {
      if (result.length === 0 && stringALength < stringBLength) {
        break;
      }

      result += 'a';
      stringALength--;

      if (stringALength < stringBLength || result.endsWith('aa')) {
        break;
      }
    }

    while (stringBLength > 0) {
      if (result.length === 0 && stringBLength < stringALength) {
        break;
      }

      result += 'b';
      stringBLength--;
      if (stringALength > stringBLength || result.endsWith('bb')) {
        break;
      }
    }
  } while (stringALength + stringBLength > 0);

  return result;
};
