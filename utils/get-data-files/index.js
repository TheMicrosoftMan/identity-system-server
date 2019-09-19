const pathToData = "./data";

const fs = require("fs");
const path = require("path");
const directoryPath = path.resolve(pathToData);

const getDataFiles = () => {
  const pathsFilesArr = [];
  fs.readdirSync(directoryPath).forEach(file => {
    pathsFilesArr.push(path.join(directoryPath, file));
  });
  return pathsFilesArr;
};

module.exports = getDataFiles;
