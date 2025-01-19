const os = require('os');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname,"project-dist");
const cssFolder = path.join(__dirname,"styles");
const assetsFolder = path.join(__dirname,"assets");
const buildedHtml = path.join(destFolder,"index.html");
