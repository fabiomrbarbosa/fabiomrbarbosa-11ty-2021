const { DateTime } = require("luxon");

module.exports = (dateObj, locale) => {
  // .toLocaleString returns a natural language phrase instead of just translating the month names etc.
  return DateTime.fromJSDate(dateObj, { zone: "utc" })
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_FULL);
}
