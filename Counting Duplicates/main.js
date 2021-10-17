function countingDuplicates(str) {
  const uniqueChars = Array.from(new Set(str.split('').map((char) => char.toLowerCase())));
  const occurencesList = uniqueChars.map((char) => str.match(new RegExp(char, 'gi')).length);

  return occurencesList.filter((occurence) => occurence > 1).length;
}
