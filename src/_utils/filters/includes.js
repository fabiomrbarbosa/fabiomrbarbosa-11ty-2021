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

    // If data is a Date, reformat as ISO 8601
    if (data instanceof Date) {
      data = data.toISOString();
    }

    return data.includes(value) ? item : false;
  });
}
