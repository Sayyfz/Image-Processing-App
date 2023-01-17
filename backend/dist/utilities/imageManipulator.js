"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openImg = exports.getImgMetaData = exports.convertImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const memory_cache_1 = __importDefault(require("memory-cache"));
let resized;
const convertImage = (fileName, width, height) => {
    const generatedImgPath = `images/thumb/${fileName}.jpg`;
    return new Promise((resolve, reject) => {
        resizeImg(fileName, width, height)
            .then(() => {
            // We still need to save the image to the file system so we proceed to do that next
            const resultImg = saveImg(resized, generatedImgPath);
            resolve(resultImg);
        })
            .catch(err => {
            reject(err);
        });
    });
    //If the promise did not resolve, this should return undefined, which I should handle in the image controller
};
exports.convertImage = convertImage;
const resizeImg = (imgName, width, height) => {
    return new Promise((resolve, reject) => {
        (0, sharp_1.default)(`images/full/${imgName}.jpg`)
            .resize(width, height)
            .toBuffer()
            .then((data) => {
            resized = data;
            resolve();
        })
            .catch((error) => {
            reject(error.message);
        });
        // This promise handles the resize of the image and converts it into a buffer
    });
};
const getImgMetaData = (imgFile) => {
    return new Promise((resolve, reject) => {
        (0, sharp_1.default)(imgFile)
            .metadata()
            .then((data) => {
            resolve(data);
        })
            .catch((error) => {
            console.log(error.message);
            reject('Error occured while reading image data');
        });
    });
};
exports.getImgMetaData = getImgMetaData;
/*The reason I wrapped the file saving after the image resize is because it is dependant on the image
to be existing inside the thumb folder in the first place */
const saveImg = (img, path) => {
    return new Promise((resolve, reject) => {
        fs_1.promises.writeFile(path, img)
            .then(() => {
            memory_cache_1.default.put(path, resized, 60 * 1000); //image is cached for 1 min here
            resolve(resized);
        })
            .catch((err) => {
            console.error(err);
            reject(err);
        });
    });
};
const openImg = (path) => {
    return new Promise((resolve, reject) => {
        fs_1.promises.readFile(path)
            .then(buffer => {
            // I am not sure if this is required as the other one
            // but it's surely better to cache the loading of the original image too when the user doesn't specify height or width
            memory_cache_1.default.put(path, buffer, 30 * 1000);
            resolve(buffer);
        })
            .catch((err) => {
            reject(err.message);
        });
    });
};
exports.openImg = openImg;
