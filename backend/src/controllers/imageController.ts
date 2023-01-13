import express from 'express';
import { ResizedImg } from '../custom-types/image';
import { convertImage } from '../utilities/imageConverter';
import path from 'path';

export const loadImgAndResize = async (req: express.Request, res: express.Response) => {
    const { filename, width, height } = req.query;

    if (!filename) {
        return res.send('Specify all the needed data in the query');
    }
    if (!width || !height) {
        return res.set('Content-Type', 'image/jpeg').send(`images/full/${filename}.jpg)`);
    }

    const conversionPromise: Promise<ResizedImg> = convertImage(
        filename as unknown as string,
        parseInt(width as unknown as string),
        parseInt(height as unknown as string),
    ); //returns either a Buffer or undefined

    try {
        const resized = await conversionPromise;
        return res.set('Content-Type', 'image/jpeg').send(resized);
    } catch (error: unknown) {
        console.error((error as Error).message);
        return res.send('No image found with the name ' + filename);
    }
};
