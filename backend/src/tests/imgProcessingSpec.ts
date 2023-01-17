import sharp, { Metadata } from 'sharp';
// import supertest from 'supertest';
import { convertImage, getImgMetaData } from '../utilities/imageManipulator';

describe('Image Processing Suite here', () => {
    it('expects image to have 500x200 dimensions', async () => {
        const filename = 'fjord';
        const convertedImg = (await convertImage(filename, 500, 200)) as unknown as Buffer;
        if (convertedImg) {
            getImgMetaData(convertedImg).then((data: Metadata) => {
                expect(data.width).toEqual(500);
                expect(data.height).toEqual(200);
            });
        }
    });

    // it('exoects image to be converted to png', () => {
    //     expect;
    // });
});

// Check if metadata.width is equal to the enetered param inside of convertImage
