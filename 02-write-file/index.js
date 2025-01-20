const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const { EventEmitter } = require('stream');
let writefile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(writefile, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(writefile, { flags: 'a' });
const event = new EventEmitter();

readableStream.on('data', () => {});
readableStream.on('end', () => event.emit('ready'));
readableStream.on('error', () => {
  console.log('Файл не обнаружен и создан автоматически');
  writeStream.write('');
  event.emit('ready');
});

let input = '';
event.on('ready', () => {
  stdout.write('Input text:\n');

  stdin.on('data', (data) => {
    input = Buffer.from(data, 'utf-8').toString();
    if (input.trim() === 'exit') {
      process.exit();
    } else {
      writeStream.write(input);
    }
  });
});

process.on('exit', (code) => {
  if (code === 0) {
    stdout.write('Good-bye!\n');
    writeStream.close();
    readableStream.close();
  }
});

process.on('SIGINT', () => process.exit());
