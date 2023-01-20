import express, { NextFunction } from 'express';
import cache from 'memory-cache';
import { openImg } from './imageManipulator';

const imgValidationAndCacheMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction,
): Promise<express.Response | void> => {
    const { filename, width, height } = req.query;
    const fullImgPath = `images/full/${filename}.jpg`;

    if (!filename) {
        return res.send('Specify all the needed data in the query');
    }

    if (!width || !height) {
        try {
            const cachedImg = cache.get(fullImgPath);
            if (cachedImg) {
                console.log('cache retrieved');
                return res.set('Content-Type', 'image/jpeg').send(cachedImg);
            }
            //If there is no height or width specified, we will just serve the original image
            const defaultImg = await openImg(fullImgPath);
            console.log('default retrieved');
            return res.set('Content-Type', 'image/jpeg').send(defaultImg);
        } catch (err) {
            return res.send(err);
        }
    }

    try {
        const path = `images/thumb/${filename}${width}x${height}.jpg`;
        const cachedImg = cache.get(path);

        if (cachedImg) {
            return res.set('Content-Type', 'image/jpeg').send(cachedImg);
        }
    } catch (error: unknown) {
        return res.send('No image found with the name ' + filename);
    }

    //if the image either exists in cache but with different dimensions or it doesn't exist in cache at all
    //in this case we call next middleware

    next();
};

export default imgValidationAndCacheMiddleware;
