// 3 - loop inside map & splice
const destroyerThree = (arr, ...args) => {
  args.map(elem => {
    const initLength = arr.length;

    for (let i = initLength - 1; i > -1; i--) {
      if (arr[i] === elem) arr.splice(i, 1);
    }
  });

  return arr;
};

export default destroyerThree;
