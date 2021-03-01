module.exports = function (str) {
  return escape(
    encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    })
  );
}
