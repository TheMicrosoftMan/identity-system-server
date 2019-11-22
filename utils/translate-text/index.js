const axios = require("axios");

const translateText = text => {
  return new Promise((resolve, reject) => {
    if (text.length < 400) {
      const encodedText = encodeURI(text.toLowerCase());
      axios
        .get(
          `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=uk|en`
        )
        .then(data => {
          const translatedtext = data.data.responseData.translatedText;
          resolve(translatedtext);
        })
        .catch(err => {
          reject({ err });
        });
    } else {
      reject({ err: "TEXT IS TOO LONG" });
    }
  });
};

module.exports = translateText;
