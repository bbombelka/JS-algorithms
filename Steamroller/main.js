// Intermediate Algorithm Scripting: Steamroller by freeCodeCamp
// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/steamroller/

// Flatten a nested array. You must account for varying levels of nesting.

// steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].
//steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].
//steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].
//steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].

// my solution uses method introduced lately - array.prototype.flat() making the task pretty simple ;-)

const steamrollArray = arr => {
  do {
    arr = arr.flat();
  } while (arr.some(elem => Array.isArray(elem) === true));

  return [...arr.flat()];
};
