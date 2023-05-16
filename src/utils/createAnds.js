// creates a list from the list of semesters in a listing
export function createAnds(array) {
  if (array.length > 1) {
    let lastItem = array.pop();
    let result =
      array.join(`${array.length === 2 ? "" : ","} `) + " and " + lastItem;
    return result;
  } else {
    return array;
  }
}
