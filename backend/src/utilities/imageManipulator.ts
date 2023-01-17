import sharp, { Metadata, OutputInfo } from 'sharp';
import { promises as fs } from 'fs';
import { CustomBuffer } from '../custom-types/image';
import cache from 'memory-cache';

let resized: CustomBuffer;

export const convertImage = (
    fileName: string,
    width: number,
    height: number,
): Promise<CustomBuffer> => {
    const generatedImgPath = `images/thumb/${fileName}.jpg`;

    return new Promise((resolve, reject) => {
        resizeImg(fileName, width, height)
            .then(() => {
                const resultImg = saveImg(resized, generatedImgPath);
                resolve(resultImg);
            })
            .catch(err => {
                reject(err);
            });
    });
    //If the promise did not resolve, this should return undefined, which I should handle in the image controller
};

const resizeImg = (imgName: string, width: number, height: number) => {
    return new Promise<void>((resolve, reject) => {
        sharp(`images/full/${imgName}.jpg`)
            .resize(width, height)
            .toBuffer()
            .then((data: Buffer) => {
                resized = data;
                resolve();
            })
            .catch((error: Error) => {
                console.error(error.message);
                reject(error.message);
            });
        // This promise handles the resize of the image and converts it into a buffer
        // We still need to save the image to the file system so we proceed to do that next
    });
};

export const getImgMetaData = (imgFile: Buffer | string) => {
    return new Promise<Metadata>((resolve, reject) => {
        sharp(imgFile)
            .metadata()
            .then((data: Metadata) => {
                resolve(data);
            })
            .catch((error: Error) => {
                console.log(error.message);
                reject('Error occured while reading image data');
            });
    });
};

/*The reason I wrapped the file saving after the image resize is because it is obviously dependant on the image 
to be existing inside the thumb folder in the first place*/
const saveImg = (img: CustomBuffer, path: string) => {
    return new Promise<CustomBuffer>((resolve, reject) => {
        fs.writeFile(path, img as unknown as string)
            .then(() => {
                cache.put(path, resized, 60 * 1000); //image is cached for 1 min here
                resolve(resized);
            })
            .catch((err: Error) => {
                console.error(err);
                reject(err);
            });
    });
};

export const openImg = (path: string) => {
    return new Promise<CustomBuffer>((resolve, reject) => {
        fs.readFile(path)
            .then(buffer => {
                // I am not sure if this is required as the other one
                // but it's surely better to cache the loading of the original image too when the user doesn't specify height or width
                cache.put(path, buffer, 30 * 1000);
                resolve(buffer);
            })
            .catch((err: Error) => {
                reject(err.message);
            });
    });
};
