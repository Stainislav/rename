const fs = require('fs');
const https = require('https');
const { createClient } = require('pexels');

const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const client = createClient(API_KEY);

const dirPath = 'files';
const query = 'Nature';
const photosNumber = 3;

async function downloadPhotos(client, query, photosNumber){
    try {
        const photos = await client.photos.search({ query, per_page: photosNumber });
        const photosArray = photos.photos;

        for (const photo of photosArray) {

            const url = photo.src.original;
            const stringArray = url.split('/');
            const fileName = stringArray[stringArray.length - 1];

            await https.get(url, function(response) {
                let file = fs.createWriteStream(dirPath + '/' + fileName);
                response.pipe(file);
            });
        }
    } catch (err) {
        console.error(`The next error has happened during the downloading: ${err}`);
    }
}

console.log('Downloading has started...');
downloadPhotos(client, query, photosNumber).then(() => {
    console.log('Renaming is done. Check your files folder.');
});


