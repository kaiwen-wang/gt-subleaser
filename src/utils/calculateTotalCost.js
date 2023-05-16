// self explanatory
export function calculateTotalCost(monthly, utilities, other, datein, dateout) {
  // Parse the input dates
  const inDate = new Date(datein);
  const outDate = new Date(dateout);

  // Calculate the total number of days
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((inDate - outDate) / oneDay));

  // Calculate total months and remaining days
  const totalMonths = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  // Calculate total cost
  let totalCost =
    totalMonths * monthly + // Rent for total months
    (remainingDays / 30) * monthly + // Rent for remaining days, scaled
    totalMonths * utilities + // Utilities for total months
    other; // One-time fee

  // cut off all decimals
  totalCost = Math.trunc(totalCost);

  // add any commas if necessary
  totalCost = totalCost.toLocaleString();

  return totalCost;
}
