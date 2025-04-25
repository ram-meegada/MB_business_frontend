function getYearDropDown() {
  let startingYear = 2020;
  const curryear = new Date().getFullYear();
  const res = [];

  while (curryear + 1 != startingYear) {
    res.push({ label: startingYear.toString(), value: startingYear.toString() });
    startingYear += 1;
  }
  return res;
}

const x = getYearDropDown();
console.log(x);
