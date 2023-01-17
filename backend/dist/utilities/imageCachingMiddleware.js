"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_1 = __importDefault(require("memory-cache"));
const sharp_1 = __importDefault(require("sharp"));
const imgCachingMiddleware = (req, res, next) => {
    const { filename, width, height } = req.query;
    if (!filename) {
        return res.send('Specify all the needed data in the query');
    }
    if (!width || !height) {
        try {
            const path = `images/full/${filename}.jpg`;
            const cachedImg = memory_cache_1.default.get(path);
            if (cachedImg) {
                return res.set('Content-Type', 'image/jpeg').send(cachedImg);
            }
        }
        catch (err) {
            return res.send(err);
        }
    }
    try {
        const path = `images/thumb/${filename}.jpg`;
        const cachedImg = memory_cache_1.default.get(path);
        if (cachedImg) {
            //check if the width and height are the same as the img retrieved here
            (0, sharp_1.default)(cachedImg)
                .metadata()
                .then((data) => {
                // If the requested image exists in cache and has the same size then we serve it
                if (data.width === width && data.height === height)
                    return res.set('Content-Type', 'image/jpeg').send(cachedImg);
            })
                .catch((err) => {
                return res.send('Cannot retrieve image data from cache');
            });
        }
    }
    catch (error) {
        return res.send('No image found with the name ' + filename);
    }
    //if the image either exists in cache but with different dimensions or it doesn't exist in cache at all
    //in this case we call next middleware
    next();
};
exports.default = imgCachingMiddleware;
