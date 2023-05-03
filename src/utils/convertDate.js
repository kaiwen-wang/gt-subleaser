export function convertDate(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const day = date.getDate();
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }

  return formattedDate.replace(/\d+/, day + suffix);
}
