import https from 'https';
import fs from 'fs';

async function downloadPhotos(client, query, dirPath, photosNumber){
    try {
        const photos = await client.photos.search({ query, per_page: photosNumber });
        const photosArray = photos.photos;

        for (const photo of photosArray) {

            const url = photo.src.original;
            const stringArray = url.split('/');
            const fileName = stringArray[stringArray.length - 1];

            await https.get(url, function(response) {
                const file = fs.createWriteStream(dirPath + '/' + fileName);
                response.pipe(file);
            });
        }
    } catch (err) {
        console.error(`The next error has happened during the downloading: ${err}`);
    }
}

export { downloadPhotos };