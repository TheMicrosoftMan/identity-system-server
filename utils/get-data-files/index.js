const pathToData = "./data";
const pathToExamples = "./examples";

const fs = require("fs");
const path = require("path");
const dataDirectoryPath = path.resolve(pathToData);
const examplesDirectoryPath = path.resolve(pathToExamples);

const getDataFiles = () => {
  const pathsFilesArr = [];
  fs.readdirSync(dataDirectoryPath).forEach(file => {
    pathsFilesArr.push(path.join(dataDirectoryPath, file));
  });
  return pathsFilesArr;
};

const getExampleFile = () => {
  let exampleFilesArr = [];
  fs.readdirSync(examplesDirectoryPath).forEach(file => {
    exampleFilesArr.push(path.join(examplesDirectoryPath, file));
  });
  return exampleFilesArr;
};

module.exports = { getDataFiles, getExampleFile };
