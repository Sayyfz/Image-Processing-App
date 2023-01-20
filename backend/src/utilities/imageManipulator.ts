import sharp, { Metadata, OutputInfo } from 'sharp';
import { promises as fs } from 'fs';
import { CustomBuffer } from '../custom-types/image';
import cache from 'memory-cache';

let resized: CustomBuffer;
interface fileReadResponse {
    found: boolean;
    data?: Buffer;
}

export const convertImage = (
    fileName: string,
    width: number,
    height: number,
): Promise<CustomBuffer> => {
    const generatedImgPath = `images/thumb/${fileName}${width}x${height}.jpg`;

    return new Promise((resolve, reject): void => {
        resizeImg(fileName, width, height)
            .then((): void => {
                // We still need to save the image to the file system so we proceed to do that next
                const resultImg = saveImg(resized, generatedImgPath);
                resolve(resultImg);
            })
            .catch((err): void => {
                reject(err);
            });
    });
    //If the promise did not resolve, this should return undefined, which I should handle in the image controller
};

const resizeImg = (imgName: string, width: number, height: number): Promise<void> => {
    return new Promise<void>((resolve, reject): void => {
        sharp(`images/full/${imgName}.jpg`)
            .resize(width, height)
            .toBuffer()
            .then((data: Buffer): void => {
                resized = data;
                resolve();
            })
            .catch((error: Error): void => {
                reject(error.message);
            });
        // This promise handles the resize of the image and converts it into a buffer
    });
};

export const getImgMetaData = (imgFile: Buffer | string): Promise<Metadata> => {
    return new Promise<Metadata>((resolve, reject): void => {
        sharp(imgFile)
            .metadata()
            .then((data: Metadata): void => {
                resolve(data);
            })
            .catch((error: Error): void => {
                console.log(error.message);
                reject('Error occured while reading image data');
            });
    });
};

/*The reason I wrapped the file saving after the image resize is because it is dependant on the image 
to be existing inside the thumb folder in the first place */
const saveImg = (img: CustomBuffer, path: string): Promise<CustomBuffer> => {
    return new Promise<CustomBuffer>((resolve, reject): void => {
        fs.writeFile(path, img as unknown as string)
            .then((): void => {
                cache.put(path, resized, 60 * 1000); //image is cached for 1 min here
                resolve(resized);
            })
            .catch((err: Error): void => {
                console.error(err);
                reject(err);
            });
    });
};

export const openImg = (path: string): Promise<CustomBuffer> => {
    return new Promise<CustomBuffer>((resolve, reject): void => {
        fs.readFile(path)
            .then((buffer): void => {
                // I am not sure if this is required as the other one
                // but it's surely better to cache the loading of the original image too when the user doesn't specify height or width
                cache.put(path, buffer, 30 * 1000);
                resolve(buffer);
            })
            .catch((err: Error): void => {
                reject(err.message);
            });
    });
};

export const fileExists = (filename: string): Promise<fileReadResponse> => {
    return new Promise<fileReadResponse>((resolve, reject): void => {
        fs.readFile(filename)
            .then((data: Buffer): void => {
                resolve({ found: true, data });
            })
            .catch((err: Error): void => {
                reject(err.message);
            });
    });
};
