"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImgAndResize = void 0;
const loadImgAndResize = (req, res) => {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        return res.send('Specify all the needed data in the query');
    }
    return res.send(`Your width is ${width} Your height is ${height} and your name is ${filename}`);
};
exports.loadImgAndResize = loadImgAndResize;
