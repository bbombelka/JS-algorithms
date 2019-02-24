// 1 - filter & include
const destroyer = (arr, ...args) => arr.filter(elem => !args.includes(elem));

export default destroyer;
