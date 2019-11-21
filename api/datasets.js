const express = require("express");
const router = express.Router();
const csv = require("csvtojson");
const analisator = require("../analisator");
const utils = require("../utils");

router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const text = req.body.text;
  const file = req.files.file;

  const stringFile = file.data.toString();

  csv()
    .fromString(stringFile)
    .then(data => {
      const nbc = analisator.initNBCFromCSV(data);
      const predictResult = analisator.predict(nbc, text);
      const obj = {
        text: text,
        predict: predictResult
      };
      console.log(`${text} - ${predictResult.author}`);
      res.send(obj);
    });
});

router.get("/example", (req, res) => {
  const exampleFile = utils.getExampleFile()[0];
  res.download(exampleFile);
});

module.exports = router;
