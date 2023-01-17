import express from 'express';
import { CustomBuffer } from '../custom-types/image';
import { convertImage, openImg } from '../utilities/imageManipulator';

export const loadImgAndResize = async (req: express.Request, res: express.Response) => {
    const { filename, width, height } = req.query;

    if (!width || !height) {
        try {
            const path = `images/full/${filename}.jpg`;
            const defaultImg = await openImg(path);
            return res.set('Content-Type', 'image/jpeg').json({ img: defaultImg });
        } catch (err) {
            return res.send((err as Error).message);
        }
    }

    const conversionPromise: Promise<CustomBuffer> = convertImage(
        filename as unknown as string,
        parseInt(width as unknown as string),
        parseInt(height as unknown as string),
    ); //returns either a Buffer or undefined

    try {
        const resized = await conversionPromise;
        return res.set('Content-Type', 'image/jpeg').json({ img: resized });
    } catch (error) {
        console.log(error);
        return res.status(400).send(`No image found with the name ${filename}`);
    }
};
