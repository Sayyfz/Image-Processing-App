import sharp, { OutputInfo } from 'sharp';
import { promises as fs } from 'fs';
import { ResizedImg } from '../custom-types/image';

let resized: ResizedImg;

export const convertImage = (
    fileName: string,
    width: number,
    height: number,
): Promise<ResizedImg> => {
    const generatedImgPath = `images/thumb/${fileName}.jpg`;
    //If the promise did not resolve, this should return undefined, which I should handle in the image controller
    return new Promise<ResizedImg>((resolve, reject) => {
        resizeImg(fileName, width, height).then(() => {
            saveImg(resized, generatedImgPath);
        });

        /*The reason I wrapped the file saving after the image resize is because it is obviously dependant on the image 
        to be existing inside the thumb folder in the first place*/
    });
};

const saveImg = (img: ResizedImg, path: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, img as unknown as string)
            .then(() => {
                resolve(resized);
                console.log('Image saved successfully');
            })
            .catch((err: Error) => {
                console.error(err);
                reject(err);
            });
    });
};

const resizeImg = (imgName: string, width: number, height: number) => {
    return new Promise<void>((resolve, reject) => {
        sharp(`images/full/${imgName}.jpg`)
            .resize(width, height)
            .toBuffer()
            .then((data: Buffer) => {
                resized = data;
                console.log('image resized successfully');
                resolve();
            })
            .catch((error: Error) => {
                console.error(error.message);
                reject();
            });
        // This promise handles the resize of the image and converts it into a buffer
        // We still need to save the image to the file system so we proceed to do that next
    });
};
