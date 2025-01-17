const fs = require('fs');
const path =require("path");

fs.readdir(path.join(__dirname,"secret-folder"),
  { withFileTypes: true },  (err, files) => {
 
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if(file.isFile()){
        fs.stat(path.join(file.parentPath,file.name), (err, info) => {
          console.log(info);
        });
      }
    });
  }
});
