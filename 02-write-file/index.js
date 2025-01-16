const fs = require("fs");
const path =require("path");
const { stdin, stdout } = process;
let writefile= path.join(__dirname,'text.txt');

stdout.write("Input text:\n");



stdin.on("data", (data) => {
 let input= Buffer.from(data, "utf-8").toString();
if(input.trim()==="exit"){
  process.exit();
} 
});

process.on("exit", (code) => {
  if (code === 0) {
    stdout.write("Good-bye!\n");
  }
});