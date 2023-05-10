const split = (str, delimiter) => {
  if (
    !str ||
    typeof str !== "string" ||
    !delimiter ||
    typeof delimiter !== "string"
  ) {
    return [];
  }

  const replacedStr = str.replace(/<br>/gi, "\n").replace(/<\/?strong>/gi, "\n");
  return replacedStr.split(delimiter);
};

module.exports = {
  split,
};
