const ukrstemmer = require("ukrstemmer");

const ukrstem = tokens => {
  return tokens.map(token => ukrstemmer(token));
};

module.exports = ukrstem;
