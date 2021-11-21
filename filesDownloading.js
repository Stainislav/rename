import { createClient } from 'pexels';
import { downloadPhotos } from './photosDownloading.js';
import { downloadVideos } from './videosDownloading.js';
import { addSpecialCharactersToFileNames } from './filesRenaming.js';

import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const client = createClient(API_KEY);

const photosDirPath = 'photos';
const videosDirPath = 'videos';
const query = 'Nature';
const photosNumber = 4;
const videosNumber = 4;

console.log('Photos downloading has started.');

downloadPhotos(client, query, photosDirPath, photosNumber).then(() => {
    setTimeout(() => {
        console.log('Photos renaming has started.');
        addSpecialCharactersToFileNames(photosDirPath).then(() => {
            console.log('Photos renaming is done.');
        });
    }, 10000);
    console.log('Photos downloading is done.');
});

console.log('Videos downloading has started.');

downloadVideos(client, query, videosDirPath, videosNumber).then(() => {
    setTimeout(() => {
        console.log('Videos renaming has started.');
        addSpecialCharactersToFileNames(videosDirPath).then(() => {
            console.log('Videos renaming is done.');
        });
    }, 20000);
    console.log('Videos downloading is done.');
});

