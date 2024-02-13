// Given an input of array,
// which is made of items with >= 3 properties

let items = [
  { color: "red", type: "tv", age: 18 },
  { color: "silver", type: "phone", age: 20 },
  { color: "blue", type: "book", age: 17 },
];

// an exclude array made of key value pair
const excludes = [
  { k: "color", v: "silver" },
  { k: "type", v: "tv" },
];

//   function excludeItems(items, excludes) {
//     excludes.forEach( pair => {
//       items = items.filter(item => item[pair.k] === item[pair.v])
//     })

//     return items
//   }

function exlcude() {
  const map = new Map();
  excludes.forEach((item) => (map[item.k] = item.v));

  return items.filter((item) => {
    let remove = false;
    for (let x of Object.keys(item)) {
      if (map[x] && map[x] === item[x]) {
        remove = true;
      }
    }

    return !remove;
  });
}
