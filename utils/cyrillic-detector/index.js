const cyrillicPattern = /^[\u0400-\u04FF]+$/;

const isCyrillic = text => {
  const firstWord = text.split(" ")[0];
  return cyrillicPattern.test(firstWord);
};

module.exports = isCyrillic;
