const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const sentimentConstants = {
  POSITIVE: "POSITIVE",
  NEUTRAL: "NEUTRAL",
  NEGATIVE: "NEGATIVE"
};

const sentimentAnalysis = text => {
  let analyzedResults = {
    analyzedSentenceArr: [],
    averageScore: 0
  };
  const sentenceArr = text.split(".");
  sentenceArr.forEach(sentence => {
    if (sentence.length > 0) {
      let currentSentiment = sentiment.analyze(sentence);
      let sticker = sentimentConstants.NEUTRAL;
      if (currentSentiment.score > 0) {
        sticker = sentimentConstants.POSITIVE;
      } else if (currentSentiment.score < 0) {
        sticker = sentimentConstants.NEGATIVE;
      }
      analyzedResults.analyzedSentenceArr.push({
        text: sentence,
        score: currentSentiment.score,
        sticker
      });
    }
  });
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
