// Find the Symmetric Difference
// Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

// Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}). The resulting array must contain only unique values (no duplicates).

// symmetric([1, 2, 3], [5, 2, 1, 4]) => [3, 4, 5]
// sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]) => [2, 3, 4, 6, 7]
// more test cases https://learn.freecodecamp.org/coding-interview-prep/algorithms/find-the-symmetric-difference

const symmetric = (...data) => {
  const result = Array();

  let compared = data.shift();

  const unique = (element, arrToPushInto) =>
    arrToPushInto.includes(element) ? null : arrToPushInto.push(element);

  do {
    compared.map(elem => (data[0].includes(elem) ? null : unique(elem, result)));

    data[0].map(elem => (compared.includes(elem) ? null : unique(elem, result)));

    data.shift();

    compared = result.slice();

    result.splice(0, result.length);
  } while (0 < data.length);

  return compared.sort((a, b) => a - b);
};
