import https from 'https';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

async function downloadVideos(client, query, dirPath, videosNumber){
    try {
        const videos = await client.videos.search({ query, per_page: videosNumber });
        const videosArray = videos.videos;

        for (const video of videosArray) {
            const url = video.video_files[0].link;

            https.get(url, function(response) {

                const urlOfVideo = response.headers.location;
                const stringArray = urlOfVideo.split('filename=');
                const fileName = stringArray[stringArray.length - 1];

                const fileNameArray = fileName.split('.mp4');
                const fileNameWithoutExtension = fileNameArray[0];

                https.get(urlOfVideo, function(response) {
                    const file = fs.createWriteStream(dirPath + '/' + fileNameWithoutExtension + uuidv4() + '.mp4');
                    response.pipe(file);
                });
            });
        }
    } catch (err) {
        console.error(`The next error has happened during a video downloading: ${err}`);
    }
}

export { downloadVideos };
