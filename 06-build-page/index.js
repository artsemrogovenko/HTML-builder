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

async function readFile(path,call){
  let text= "";
  const stream = fs.createReadStream(path,"utf8");
    stream.on("data", (data) =>{text+=data});
    stream.on("end", () =>{ call(null,text)});
    stream.on("error", (err)=>{call(err,null)});
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
  let textPage="";
  readFile(htmlPath,(err,data)=>{
    if(err){
      console.log(err);
      textPage= null;
    }else{
      textPage= data;
      console.log(textPage);
    }
  });
}

function cloneFolders(src){
  fs.readdir(src,
    { withFileTypes: true },  (err, files) => {
  
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        let targetPath=path.join(file.parentPath,file.name);
        let destPath=path.join(destFolder,"assets",file.name);

        if(file.isFile()){
            destPath=path.join(destFolder,"assets",targetPath.split("assets\\")[1]);
            fs.copyFile(targetPath,destPath,(err) => {          });
          }else{
            fs.mkdir(destPath, {recursive: true }, (err) => {
                if (err) {
                  console.log(err.message);
                }
                cloneFolders(targetPath);
              });
          }
      });
    }
  });
}

function startBuild(){
  copyHtml();
  mergeStyles();
  cloneFolders(assetsFolder);
  replaceSection(buildedHtml);
}