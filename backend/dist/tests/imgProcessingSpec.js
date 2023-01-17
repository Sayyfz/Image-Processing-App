"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import supertest from 'supertest';
const imageManipulator_1 = require("../utilities/imageManipulator");
describe('Image Processing Suite here', () => {
    it('expects image to have 500x200 dimensions', async () => {
        const filename = 'fjord';
        const convertedImg = (await (0, imageManipulator_1.convertImage)(filename, 500, 200));
        if (convertedImg) {
            (0, imageManipulator_1.getImgMetaData)(convertedImg).then((data) => {
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
