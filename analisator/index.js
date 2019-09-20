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

const predict = text => {
  const predictAuthor = nbc.predict(text);
  const predictSentiment = sentiment(text);
  return {
    author: predictAuthor,
    sentiment: predictSentiment
  };
};

module.exports = predict;
