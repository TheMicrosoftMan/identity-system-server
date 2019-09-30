const Classifier = require("./naive-bayes-text-classifier");
const nbc = Classifier();
const nlp = require("wink-nlp-utils");
const analizeUtils = require("./utils");
const sentiment = require("./sentiment-analysis");

const utils = require("../utils");

const pathsToData = utils.getDataFiles();

nbc.definePrepTasks([
  analizeUtils.tokenize,
  nlp.tokens.removeWords,
  analizeUtils.ukrstem,
  nlp.tokens.stem
]);

nbc.defineConfig({
  considerOnlyPresence: true,
  smoothingFactor: 0.5
});

console.log("Training start.");
console.time("Training");

pathsToData.forEach(trainingFile => {
  const data = require(trainingFile);
  for (let i = 0; i < data.data.length; i++) {
    nbc.learn(data.data[i].text, data.data[i].author);
  }
});

nbc.consolidate();

console.timeEnd("Training");
console.log("Training complete.");
console.log("Naive Bayes text classifier is ready.");

console.log("Getting statistic");
const stats = utils.getStats(pathsToData, nbc);
console.log("Statistic:");
console.log(
  `\tAuthors count: ${stats.authorsCount}\n\tText count: ${stats.textsCount}\n\tWords Count: ${stats.wordsCount}`
);

const predict = text => {
  const possibleAuthors = nbc.predict(text);
  const predictAuthor = possibleAuthors[0][0];
  const predictSentiment = sentiment(text);
  return {
    author: predictAuthor,
    possibleAuthors,
    sentiment: predictSentiment
  };
};

module.exports = { predict, stats };
