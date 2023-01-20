import express from 'express';
import { convertImage, fileExists } from '../utilities/imageManipulator';

export const loadImgAndResize = async (
    req: express.Request,
    res: express.Response,
): Promise<express.Response> => {
    const { filename, width, height } = req.query;

    const resizedImgPath = `images/thumb/${filename}${width}x${height}.jpg`;

    try {
        const searchInfo = await fileExists(resizedImgPath);
        if (searchInfo.found) {
            return res.status(200).send(searchInfo.data);
        }
    } catch (err) {
        console.log('Couldnt find img with the same name, we will just resize a new image for you');
    }

    //No file with the same name found, so we proceed to resizing process

    try {
        const resized = await convertImage(
            filename as unknown as string,
            parseInt(width as unknown as string),
            parseInt(height as unknown as string),
        );

        console.log(resized);

        return res.status(200).set('Content-Type', 'image/jpeg').send(resized);
    } catch (error) {
        return res.status(400).send(`No image found with the name ${filename}`);
    }
};
