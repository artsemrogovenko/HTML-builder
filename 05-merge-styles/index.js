const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname,"project-dist");
const targetFolder = path.join(__dirname,"styles");
const fileName = path.join(destFolder,"bundle.css");
const os = require('os');

fs.unlink(fileName,write);

function write(){
  fs.readdir(targetFolder,
  { withFileTypes: true },  (err, files) => {
 
  if (err) {
    console.log(err);
  } else {
    const writeStream =  fs.createWriteStream(fileName,{flags:"a"});

    let cssFiles = files.filter((file) => {
      if(file.isFile()){
        let currentPath=path.join(file.parentPath,file.name);
          let extension=path.extname(currentPath);
          return extension===".css";
      }
    });
    cssFiles.forEach((css,index)=>{
      let cssfile= path.join(css.parentPath,css.name);
      const stream = fs.createReadStream(cssfile);
      stream.on("data", (data) => {
        index < cssFiles.length-1? writeStream.write(data+ os.EOL) : writeStream.write(data);
      });
    });
  }
});
}