import fs from 'fs';
import https from 'https';
import { createClient } from 'pexels';

import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const client = createClient(API_KEY);

const dirPath = 'videos';
const query = 'Nature';
const videosNumber = 2;

async function downloadVideos(client, query, videosNumber){
    try {
        const videos = await client.videos.search({ query, per_page: videosNumber });
        const videosArray = videos.videos;

        for (const video of videosArray) {
            const url = video.video_files[0].link;

            https.get(url, function(response) {

                const urlOfVideo = response.headers.location;
                const stringArray = urlOfVideo.split('filename=');
                const fileName = stringArray[stringArray.length - 1];

                https.get(urlOfVideo, function(response) {
                    const file = fs.createWriteStream(dirPath + '/' + fileName);
                    response.pipe(file);
                });
            });
        }
    } catch (err) {
        console.error(`The next error has happened during a video downloading: ${err}`);
    }

}

console.log('Downloading has started...');
downloadVideos(client, query, videosNumber).then(() => {
    console.log('Downloading is done. Check your videos folder.');
});


