const fs = require('fs');
const { readdir } = require('fs/promises');
const { rename } = require('fs/promises');

const dirPath = 'files';

let fileNames = [
    "abc+.jpg",
    "abc=.jpg",
    "abc*.jpg",
    "abc___.jpg",
    "abc---.jpg",
    "abc123.jpg",
    "abc .jpg",
    "   .jpg",
    "hello.jpg",
    "=abc.jpg",
]

async function renameFiles(directoryPath) {
    try {
        const files = await readdir(directoryPath);
        files.forEach(async function(fileName, index) {
            if (fileNames[index] === undefined) return;
            const oldPath = dirPath + '/' + fileName;
            const newPath = dirPath + '/' + fileNames[index];
            await rename(oldPath, newPath);
        });
      } catch (err) {
        console.error(err);
      }
}

renameFiles(dirPath);
console.log('Renaming is done. Check your files folder');