import express from 'express';

export const loadImgAndResize = (req: express.Request, res: express.Response) => {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
        return res.send('Specify all the needed data in the query');
    }

    return res.send(`Your width is ${width} Your height is ${height} and your name is ${filename}`);
};
