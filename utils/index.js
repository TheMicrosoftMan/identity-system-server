const utils = {};

utils.getDataFiles = require("./get-data-files").getDataFiles;
utils.getExampleFile = require("./get-data-files").getExampleFile;
utils.getStats = require("./get-stats");
utils.clearDatasets = require("./clear-datasets");
utils.isCyrillic = require("./cyrillic-detector");
utils.traslateToEng = require("./translate-text");

module.exports = utils;
