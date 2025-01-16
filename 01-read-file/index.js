const fs = require('fs');
const path =require("path");

let readfile= path.join(__dirname,'text.txt');
const stream = fs.createReadStream(readfile,'utf-8');