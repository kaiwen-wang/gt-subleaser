export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we need to add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getOffsetDate(
  offsetYears = 0,
  offsetMonths = 0,
  offsetDays = 0,
  date
) {
  const baseDate = date ? new Date(date) : new Date();
  baseDate.setFullYear(baseDate.getFullYear() + offsetYears);
  baseDate.setMonth(baseDate.getMonth() + offsetMonths);
  baseDate.setDate(baseDate.getDate() + offsetDays);

  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, "0");
  const day = String(baseDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
