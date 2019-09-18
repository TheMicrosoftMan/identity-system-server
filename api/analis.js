const express = require("express");
const router = express.Router();
const predict = require("../utils/analisator");

router.get("/", (req, res) => {
  res.send("All working");
});

router.post("/", (req, res) => {
  const predictResult = predict(req.body.text);
  const obj = {
    text: req.body.text,
    author: predictResult
  };
  console.log(obj);
  res.send(obj);
});

module.exports = router;
