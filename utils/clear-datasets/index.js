const pathToData = "./data";

const fs = require("fs");
const path = require("path");
const directoryPath = path.resolve(pathToData);

const clearDatasets = () => {
  fs.readdirSync(directoryPath).forEach(file => {
    fs.unlinkSync(path.join(directoryPath, file));
  });
};

module.exports = clearDatasets;
