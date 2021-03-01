module.exports = (array, n) => {
  if (!array || !array.length) {
    return;
  }

  if (n < 0) {
    return array.slice(n);
  }

  return array.slice(0, n);
}
