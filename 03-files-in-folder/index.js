const fs = require('fs');
const path =require("path");

fs.readdir(path.join(__dirname,"secret-folder"),
  { withFileTypes: true },  (err, files) => {
 
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if(file.isFile()){
        let currentPath=path.join(file.parentPath,file.name);
        fs.stat(currentPath, (err, info) => {
          let extension=path.extname(currentPath);
          let name=path.basename(currentPath,extension);
          console.log(`${name} - ${extension.slice(1)} - ${info.size/1024}kb`);
        });
      }
    });
  }
});
