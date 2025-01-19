const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname,"project-dist");
const targetFolder = path.join(__dirname,"styles");
const fileName = path.join(destFolder,"bundle.css");

fs.unlink(fileName,write);

function write(){
  fs.readdir(targetFolder,
  { withFileTypes: true },  (err, files) => {
 
  if (err) {
    console.log(err);
  } else {
    const writeStream =  fs.createWriteStream(fileName,{flags:"a"});

    files.forEach((file) => {
      if(file.isFile()){
        let currentPath=path.join(file.parentPath,file.name);
        fs.stat(currentPath, (err, info) => {
          let extension=path.extname(currentPath);
          if(extension===".css"){
            let readfile= currentPath;
            const stream = fs.createReadStream(readfile,'utf-8');
            stream.on("data", (data) => {
              writeStream.write(data);
            });
          }
        });
      }
    });
  }
});
}