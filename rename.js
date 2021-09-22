const fs = require('fs');
const { readdir } = require('fs/promises');
const { rename } = require('fs/promises');
let { specialCharacters } = require('./specialCharacters.js');

async function addSpecialCharactersToFileNames(directoryPath) {
    try {
        const filesArray = await readdir(directoryPath);
        filesArray.forEach((fileName, index) => {
            if (specialCharacters[index] === undefined) return;

            const splittedFileName = fileName.split('.');
            const fileNameWithoutExtension = splittedFileName[0];
            const fileExtension = splittedFileName[1];

            const oldPath = directoryPath + '/' + fileName;
            const newPath = directoryPath + '/' + fileNameWithoutExtension + specialCharacters[index] + '.' + fileExtension;
            rename(oldPath, newPath);
        });
      } catch (err) {
        console.error(err);
      }
}

const dirPath = 'files';

addSpecialCharactersToFileNames(dirPath).then(() => {
    console.log('Renaming is done. Check your files folder');
});
