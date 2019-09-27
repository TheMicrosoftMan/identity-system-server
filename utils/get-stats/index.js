const fs = require("fs");

const getStats = (filesPaths, nbc) => {
  let stats = {
    minLength: 100,
    maxLength: 0,
    avgLength: 0
  };

  filesPaths.forEach(file => {
    const JSONString = fs.readFileSync(file);
    const dataset = JSON.parse(JSONString);
    dataset.data.forEach(data => {
      const textLength = data.text.length;
      if (textLength > stats.maxLength) {
        stats.maxLength = textLength;
      }
      if (textLength < stats.minLength) {
        stats.minLength = textLength;
      }
    });
  });
  stats.avgLength = stats.maxLength / stats.minLength;

  const nbcStats = nbc.stats();

  stats.authorsTexts = nbcStats.labelWiseSamples; // кількість текстів кожного автора
  stats.authorsWords = nbcStats.labelWiseWords; // кілкість слів у текстах кожного автора
  stats.textsCount = 0; // загальна кількість текстів
  stats.wordsCount = 0; // загальна кількість слів
  stats.authorsCount = 0; // кількість авторів

  for (const key in stats.authorsTexts) {
    stats.textsCount += stats.authorsTexts[key];
    stats.authorsCount++;
  }

  for (const key in stats.authorsWords) {
    stats.wordsCount += stats.authorsWords[key];
  }

  return stats;
};

module.exports = getStats;
