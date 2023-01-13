import express from 'express';
import { CustomBuffer } from '../custom-types/image';
import { convertImage, openImg } from '../utilities/imageManipulator';
import cache from 'memory-cache';

export const loadImgAndResize = async (req: express.Request, res: express.Response) => {
    const { filename, width, height } = req.query;

    if (!filename) {
        return res.send('Specify all the needed data in the query');
    }
    if (!width || !height) {
        try {
            const path = `images/full/${filename}.jpg`;
            // const cachedImg = cache.get(path);
            // if (cachedImg) {
            //     return res.set('Content-Type', 'image/jpeg').send(cachedImg);
            // }

            const defaultImg = await openImg(path);
            return res.set('Content-Type', 'image/jpeg').send(defaultImg);
        } catch (err) {
            return res.send(err);
        }
    }

    const conversionPromise: Promise<CustomBuffer> = convertImage(
        filename as unknown as string,
        parseInt(width as unknown as string),
        parseInt(height as unknown as string),
    ); //returns either a Buffer or undefined

    try {
        // const path = `images/thumb/${filename}.jpg`;
        // const cachedImg = cache.get(path);
        // if (cachedImg) {
        //     return res.set('Content-Type', 'image/jpeg').send(cachedImg);
        // }

        const resized = await conversionPromise;
        return res.set('Content-Type', 'image/jpeg').send(resized);
    } catch (error: unknown) {
        console.error((error as Error).message);
        return res.send('No image found with the name ' + filename);
    }
};
