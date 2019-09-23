const express = require("express");
const router = express.Router();
const predict = require("../analisator");

router.get("/", (req, res) => {
  res.send("All working");
});

router.post("/", (req, res) => {
  const text = req.body.text;
  const predictResult = predict(text);
  const obj = {
    text: text,
    predict: predictResult
  };
  console.log(`${text} - ${predictResult.author}`);
  res.send(obj);
});

module.exports = router;
