import express, { NextFunction } from 'express';
import cache from 'memory-cache';
import sharp from 'sharp';

const imgCachingMiddleware = (
    req: express.Request,
    res: express.Response,
    next: NextFunction,
): express.Response | void => {
    const { filename, width, height } = req.query;

    if (!filename) {
        return res.send('Specify all the needed data in the query');
    }

    if (!width || !height) {
        try {
            const path = `images/full/${filename}.jpg`;
            const cachedImg = cache.get(path);
            if (cachedImg) {
                return res.set('Content-Type', 'image/jpeg').send(cachedImg);
            }
        } catch (err) {
            return res.send(err);
        }
    }

    try {
        const path = `images/thumb/${filename}.jpg`;
        const cachedImg = cache.get(path);

        if (cachedImg) {
            //check if the width and height are the same as the img retrieved here
            sharp(cachedImg)
                .metadata()
                .then((data): express.Response | void => {
                    // If the requested image exists in cache and has the same size then we serve it
                    if (data.width === width && data.height === height)
                        return res.set('Content-Type', 'image/jpeg').send(cachedImg);
                })
                .catch((err: Error) => {
                    return res.send('Cannot retrieve image data from cache');
                });
        }
    } catch (error: unknown) {
        return res.send('No image found with the name ' + filename);
    }

    //if the image either exists in cache but with different dimensions or it doesn't exist in cache at all
    //in this case we call next middleware

    next();
};

export default imgCachingMiddleware;
