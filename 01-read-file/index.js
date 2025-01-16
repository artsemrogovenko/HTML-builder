const fs = require('fs');
const path =require("path");
const { stdout } = require('process');

let readfile= path.join(__dirname,'text.txt');
const stream = fs.createReadStream(readfile,'utf-8');
stream.on("data", data =>stdout.write(data));