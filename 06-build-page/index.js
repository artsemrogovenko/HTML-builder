const os = require('os');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname,"project-dist");
const cssFolder = path.join(__dirname,"styles");
const assetsFolder = path.join(__dirname,"assets");
const buildedHtml = path.join(destFolder,"index.html");

const event = new EventEmitter();
event.on('ready',startBuild);

(()=>{
  fs.rm(destFolder, { recursive: true }, (error) => {
      fs.mkdir(destFolder, (e) => {
        event.emit('ready');
      });
    });
    console.log('start build page');
})()

function copyHtml(){
  fs.copyFile(path.join(__dirname,'template.html'), buildedHtml, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
}

function readFile(path){
}

function mergeStyles(){
  fs.readdir(cssFolder,
    { withFileTypes: true },  (err, files) => {
   
    if (err) {
      console.log(err);
    } else {
      const writeStream =  fs.createWriteStream(path.join(destFolder,"style.css"),{flags:"a"});
  
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

function replaceSection(htmlPath){
}

function cloneFolders(){
}

function startBuild(){
  copyHtml();
  mergeStyles();
}