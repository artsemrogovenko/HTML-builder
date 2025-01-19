const os = require('os');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('stream');
const destFolder = path.join(__dirname,"project-dist");
const cssFolder = path.join(__dirname,"styles");
const assetsFolder = path.join(__dirname,"assets");
const buildedHtml = path.join(destFolder,"index.html");

const event = new EventEmitter();
event.on('ready',copyHtml);

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
}

function replaceSection(htmlPath){
}

function cloneFolders(){
}

function startBuild(){

}