export default function dateDiff(moveInDate, moveOutDate) {
  // Parse the dates to JavaScript Date objects
  var date1 = new Date(moveInDate);
  var date2 = new Date(moveOutDate);

  // Calculate the difference in milliseconds
  var diffInMilliseconds = date2 - date1;

  // Calculate the difference in days
  var diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  // Return the difference in days, weeks, or months
  if (diffInDays === 1) {
    return diffInDays + " day";
  } else if (diffInDays <= 7) {
    return diffInDays + " days";
  } else if (diffInDays <= 56) {
    var weeks = Math.ceil(diffInDays / 7);
    return weeks + (weeks === 1 ? " week" : " weeks");
  } else {
    var months = Math.ceil(diffInDays / 30);
    return months + (months === 1 ? " month" : " months");
  }
}
