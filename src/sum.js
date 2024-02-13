// function sum(...args) {
//   return function cu(...args2) {
//     const k = args.concat(args2).reduce((acc, c) => {
//       return acc + c;
//     }, 0);
//     return k;
//   };
// }

function sum(num) {
  const func = function (num2) {
    debugger;
    return num2 ? sum(num + num2) : num;
  };

  func.valueOf = () => num;

  return func;
}
