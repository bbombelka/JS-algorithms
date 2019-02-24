// 2 - indexOf & push

const destroyerTwo = (arr, ...args) => {
  const tempArr = Array();

  arr.map(elem => {
    if (args.indexOf(elem) === -1) tempArr.push(elem);
  });

  return (arr = tempArr);
};

export default destroyerTwo;
