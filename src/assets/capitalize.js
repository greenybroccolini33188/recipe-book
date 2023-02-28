String.prototype.capitalize = function (
  deep = false,
  depth = 0,
  separator = " "
) {
  let strVal = this.trim();
  if (!strVal.length) return null;
  let strArr = strVal.split(separator);
  if (deep === true && depth > 0) {
    let strWordCount = strArr.length;
    if (depth > strWordCount) depth = strWordCount;
    let i = 0;
    do {
      strArr[i] = strArr[i][0].toUpperCase() + strArr[i].slice(1).toLowerCase();
      i++;
    } while (i < depth);
    return strArr.join(separator);
  } else if (deep === true && depth === 0) {
    return strArr
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(separator);
  } else {
    return (
      strVal[0].valueOf().toUpperCase() +
      strVal.slice(1).valueOf().toLowerCase()
    );
  }
};

window.String.prototype.capitalize = String.prototype.capitalize;
