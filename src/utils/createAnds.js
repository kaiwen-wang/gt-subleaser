export function createAnds(array) {
  if (array.length > 1) {
    let lastItem = array.pop();
    let result = array.join(", ") + ", and " + lastItem;
    return result;
  } else {
    return array;
  }
}
