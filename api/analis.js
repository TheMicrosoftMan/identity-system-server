const express = require("express");
const router = express.Router();
const analisator = require("../analisator");

const utils = require("../utils");
const pathsToData = utils.getDataFiles();

router.post("/", (req, res) => {
  let nbc = analisator.initNBC(pathsToData);
  const text = req.body.text;
  const predictResult = analisator.predict(nbc, text);
  const obj = {
    text: text,
    predict: predictResult
  };
  console.log(`${text} - ${predictResult.author}`);
  res.send(obj);
});

module.exports = router;
