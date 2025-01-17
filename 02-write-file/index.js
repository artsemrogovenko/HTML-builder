const fs = require("fs");
const path =require("path");
const { stdin, stdout } = process;
const { EventEmitter } = require("stream");
let writefile= path.join(__dirname,'text.txt');
const readableStream = fs.createReadStream(writefile);
const writeStream =  fs.createWriteStream(writefile);
const event = new EventEmitter();

let fileData = "";

readableStream.on("end", (chunk) => event.emit('ready'));
readableStream.on("error", (error) => {
  console.log("Файл не обнаружен и создан автоматически");
  writeStream.write("");
  event.emit('ready');
});


let input="";
event.on('ready',()=>{
  stdout.write("Input text:\n");

  stdin.on("data", (data) => {
   input= Buffer.from(data, "utf-8").toString();
  if(input.trim()==="exit"){
    process.exit();
  }
  })

});

process.on("exit", (code) => {
  if (code === 0) {
    stdout.write("Good-bye!\n");
  }
});

process.on('SIGINT',()=> process.exit());