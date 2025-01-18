const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname,"project-dist");
const targetFolder = path.join(__dirname,"styles");

fs.readdir(targetFolder,
  { withFileTypes: true },  (err, files) => {
 
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if(file.isFile()){
        let currentPath=path.join(file.parentPath,file.name);
        fs.stat(currentPath, (err, info) => {
          let extension=path.extname(currentPath);
          if(extension===".css"){
          }
        });
      }
    });
  }
});
