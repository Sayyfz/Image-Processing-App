"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImgAndResize = void 0;
const imageManipulator_1 = require("../utilities/imageManipulator");
const loadImgAndResize = async (req, res) => {
    const { filename, width, height } = req.query;
    if (!width || !height) {
        try {
            const path = `images/full/${filename}.jpg`;
            const defaultImg = await (0, imageManipulator_1.openImg)(path);
            return res.set('Content-Type', 'image/jpeg').send(defaultImg);
        }
        catch (err) {
            return res.send(err);
        }
    }
    const conversionPromise = (0, imageManipulator_1.convertImage)(filename, parseInt(width), parseInt(height)); //returns either a Buffer or undefined
    try {
        const resized = await conversionPromise;
        return res.set('Content-Type', 'image/jpeg').send(resized);
    }
    catch (error) {
        return res.status(404).json({ error: `No image found with the name ${filename}` });
    }
};
exports.loadImgAndResize = loadImgAndResize;
