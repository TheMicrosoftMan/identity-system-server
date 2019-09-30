const express = require("express");
const router = express.Router();
const analisator = require("../analisator");

router.get("/", (req, res) => {
  res.send(analisator.stats);
});

router.post("/", (req, res) => {
  const text = req.body.text;
  const predictResult = analisator.predict(text);
  const obj = {
    text: text,
    predict: predictResult
  };
  console.log(`${text} - ${predictResult.author}`);
  res.send(obj);
});

module.exports = router;
