const rgx = require("../regexes");

const nlp = require("wink-nlp-utils");

const tokenize = str => {
  let tokens = nlp.string
    .tokenize(str)
    .filter(token => !token.match(rgx.nonLetter));

  // Check the 0th and last element of array for empty string because if
  // fisrt/last characters are non-words then these will be empty stings!
  if (tokens[0] === "") tokens.shift();
  if (tokens[tokens.length - 1] === "") tokens.pop();
  return tokens;
};

module.exports = tokenize;
