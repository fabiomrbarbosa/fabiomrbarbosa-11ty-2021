module.exports = (array, keyPath, value) => {
  return array.filter((item) => {
    let data = item;
    for (const key of keyPath.split(".")) {
      data = data[key];
    }

    // If data doesn’t exist, abort
    if (!data) {
      return false;
    }

    return data === value ? false : item;
  });
}
