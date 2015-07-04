// options.js
var path = require('path');
var fs = require('fs'),
configPath = path.join(__dirname, "./", 'config.json');
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.storageConfig=  parsed;
