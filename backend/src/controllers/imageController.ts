import express from 'express';
import { CustomBuffer } from '../custom-types/image';
import { convertImage, openImg } from '../utilities/imageManipulator';

export const loadImgAndResize = async (req: express.Request, res: express.Response) => {
    const { filename, width, height } = req.query;

    if (!width || !height) {
        try {
            const path = `images/full/${filename}.jpg`;
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
        const resized = await conversionPromise;
        return res.set('Content-Type', 'image/jpeg').send(resized);
    } catch (error: unknown) {
        return res.send('No image found with the name ' + filename);
    }
};
