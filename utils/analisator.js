const Classifier = require("./naive-bayes-text-classifier");
const nbc = Classifier();
const nlp = require("wink-nlp-utils");

const data = require("../data/data.json");

nbc.definePrepTasks([
  nlp.string.tokenize0,
  nlp.tokens.removeWords,
  nlp.tokens.stem
]);

nbc.defineConfig({
  considerOnlyPresence: true,
  smoothingFactor: 0.5
});

nbc.defineConfig({ considerOnlyPresence: true, smoothingFactor: 0.5 });
for (let i = 0; i < data.data.length; i++) {
  nbc.learn(data.data[i].quote, data.data[i].author);
}

nbc.consolidate();

console.log("Training completed");

module.exports = nbc.predict;
