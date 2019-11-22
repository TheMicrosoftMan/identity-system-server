const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const utils = require("../../utils");

const sentimentConstants = {
  POSITIVE: "POSITIVE",
  NEUTRAL: "NEUTRAL",
  NEGATIVE: "NEGATIVE"
};

const predictSentiment = async textToPredict => {
  let text = textToPredict.replace(/^\s*(.*)\s*$/, "$1"); // delete whitespaces
  if (utils.isCyrillic(text)) text = await utils.traslateToEng(text);
  let currentSentiment = sentiment.analyze(text);
  let sticker = sentimentConstants.NEUTRAL;
  if (currentSentiment.score > 0) {
    sticker = sentimentConstants.POSITIVE;
  } else if (currentSentiment.score < 0) {
    sticker = sentimentConstants.NEGATIVE;
  }

  return {
    text: textToPredict,
    score: currentSentiment.score,
    sticker
  };
};

const sentimentAnalysis = async text => {
  let analyzedResults = {
    analyzedSentenceArr: [],
    averageScore: 0
  };
  const sentenceArr = text.split(".");
  for (let i = 0; i < sentenceArr.length; i++) {
    const sentence = sentenceArr[i];
    if (sentence.length > 0) {
      const predicted = await predictSentiment(sentence);
      analyzedResults.analyzedSentenceArr.push(predicted);
    }
  }

  analyzedResults.averageScore = getAverageScore(
    analyzedResults.analyzedSentenceArr
  );
  return analyzedResults;
};

const getAverageScore = analyzedSentenceArr => {
  let avgScore = 0;
  analyzedSentenceArr.forEach(sentence => {
    avgScore += sentence.score;
  });
  return avgScore;
};

module.exports = sentimentAnalysis;
