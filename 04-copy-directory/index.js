const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname, 'files-copy');
const targetFolder = path.join(__dirname, 'files');
const event = new EventEmitter();

event.on('ready', copyDir);

fs.rm(destFolder, { recursive: true }, () => {
  fs.mkdir(destFolder, () => {
    event.emit('ready');
  });

  console.log('start copying');
});

function copyDir() {
  fs.readdir(targetFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        let targetPath = path.join(file.parentPath, file.name);
        let destPath = path.join(destFolder, file.name);
        fs.copyFile(targetPath, destPath, () => {});
      });
    }
  });
}
