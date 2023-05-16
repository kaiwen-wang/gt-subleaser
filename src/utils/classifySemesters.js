// self explanatory
export function classifySemesters(data) {
  const moveIn = new Date(data.move_in);
  const moveOut = new Date(data.move_out);

  let semesterData = [];

  for (let year = moveIn.getFullYear(); year <= moveOut.getFullYear(); year++) {
    // console.log(year)

    const springStart = new Date(year - 1, 11, 31); // Dec 31
    const springEnd = new Date(year, 4, 15); // May 15
    const summerEnd = new Date(year, 7, 15); // August 15
    const winterEnd = new Date(year, 11, 31); // December 31

    // console.log(springStart, springEnd, summerEnd, winterEnd)

    const springLength = Math.floor(
      (springEnd - springStart) / (1000 * 60 * 60 * 24)
    );
    const summerLength = Math.floor(
      (summerEnd - springEnd) / (1000 * 60 * 60 * 24)
    );
    const winterLength = Math.floor(
      (winterEnd - summerEnd) / (1000 * 60 * 60 * 24)
    );

    const springOverlap =
      Math.max(
        Math.min(moveOut, springEnd) - Math.max(moveIn, springStart),
        0
      ) /
      (1000 * 60 * 60 * 24);
    const summerOverlap =
      Math.max(Math.min(moveOut, summerEnd) - Math.max(moveIn, springEnd), 0) /
      (1000 * 60 * 60 * 24);
    const winterOverlap =
      Math.max(Math.min(moveOut, winterEnd) - Math.max(moveIn, summerEnd), 0) /
      (1000 * 60 * 60 * 24);

    const springPercentage = springOverlap / springLength;
    const summerPercentage = summerOverlap / summerLength;
    const winterPercentage = winterOverlap / winterLength;

    if (springPercentage >= 0.6 && !semesterData.includes(`Spring ${year}`)) {
      semesterData.push(`Spring ${year}`);
    }
    if (summerPercentage >= 0.6 && !semesterData.includes(`Summer ${year}`)) {
      semesterData.push(`Summer ${year}`);
    }
    if (winterPercentage >= 0.6 && !semesterData.includes(`Fall ${year}`)) {
      semesterData.push(`Fall ${year}`);
    }
  }

  // semesterData is empty, then it is a short-term lease
  if (semesterData.length === 0) {
    semesterData.push("Short-term lease");
  }
  return semesterData;
}
