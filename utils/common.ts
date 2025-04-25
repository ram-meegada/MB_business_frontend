export function humanReadableNum(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L";
  } else if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + "Cr";
  }
  return num;
}

export function getYearDropDown() {
  let startingYear = 2025;
  const curryear = new Date().getFullYear();
  const res = [];

  while (curryear + 1 != startingYear) {
    res.push({ label: startingYear.toString(), value: startingYear.toString() });
    startingYear += 1;
  }
  return res;
}
