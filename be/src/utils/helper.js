function toUpper(obj) {
  if (typeof obj === 'string') {
    return obj.toUpperCase();
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = toUpper(obj[i]);
    }
    return obj;
  }

  if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = toUpper(obj[key]);
      }
    }
  }

  return obj;
}

module.exports = {
  toUpper,
};
