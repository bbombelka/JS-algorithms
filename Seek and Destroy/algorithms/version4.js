const destroyerFour = (arr, ...args) => {
  // first conversion of number elements into strings
  arr.map((elem, idx) => {
    if (typeof elem == 'number') arr[idx] = elem.toString();
  });
  // array intro string
  arr = arr.join('-');

  // actual replacement
  args.map(elem => {
    arr = arr.replace(new RegExp(elem, 'ig'), '');
  });
  //devoiding of hyphens
  arr = arr
    .replace(/-(?=-)/gi, '') // those with at least another one in front
    .replace(/^-|-$|/gi, '') // trimming the string (chaining with the regexp above doesnt work)
    .split('-'); // back to array

  arr.map((elem, idx) => {
    // conversion of pure number strings - mixed ones do not meet the condition
    if (/\d/.test(elem) && !/[a-z]/i.test(elem)) arr[idx] = parseInt(elem, 10);
  });

  return arr;
};

export default destroyerFour;
