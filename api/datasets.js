const express = require("express");
const router = express.Router();
const utils = require("../utils");
const path = require("path");

const pathToData = "./data";
const directoryPath = path.resolve(pathToData);

let datasetsCounter = 0;

router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  utils.clearDatasets();

  const file = req.files.file;

  file.mv(
    `${directoryPath}/userdataset${++datasetsCounter}.${file.name}`,
    err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ status: "OK" });
    }
  );
});

module.exports = router;
