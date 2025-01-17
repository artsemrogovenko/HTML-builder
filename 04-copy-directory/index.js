const fs = require('fs');
const path = require('path');
const { copyFile, constants, mkdir } = require('fs/promises');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname,"files-copy");
const targetFolder = path.join(__dirname,"files");
const event = new EventEmitter();

event.on('ready',copyDir);

fs.mkdir(destFolder,{ recursive: true },(err)=>{
  console.log('start copying');
  event.emit('ready');
});

function copyDir(){
   fs.readdir(targetFolder,
  { withFileTypes: true },  (err, files) => {
 
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
        let targetPath=path.join(file.parentPath,file.name);
        let destPath=path.join(destFolder,file.name);
    });
  }
});

}