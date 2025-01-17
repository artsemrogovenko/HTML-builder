const fs = require('fs');
const path = require('path');
const { copyFile, constants, mkdir } = require('fs/promises');
const destFolder = path.join(__dirname,"files-copy");
