import { readdir } from 'fs/promises';
import { rename } from 'fs/promises';
import { specialCharacters } from './specialCharacters.js';

async function addSpecialCharactersToFileNames(directoryPath) {
    try {
        const filesArray = await readdir(directoryPath);

        filesArray.forEach((fileName, index) => {
            if (specialCharacters[index] === undefined) return;

            if (fileName !== '.DS_Store') {
                const splittedFileName = fileName.split('.');
                const fileNameWithoutExtension = splittedFileName[0];
                const fileExtension = splittedFileName[1];

                const oldPath = directoryPath + '/' + fileName;
                const newPath = directoryPath + '/' + fileNameWithoutExtension + specialCharacters[index] + '.' + fileExtension;
                rename(oldPath, newPath);
            }
        });
    } catch (err) {
        console.error(`The next error has happened during the files renaming: ${err}`);
    }
}

export { addSpecialCharactersToFileNames };