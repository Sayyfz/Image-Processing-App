import express from 'express';
import { welcomeMessage } from '../constants/constants';
import { loadImgAndResize } from '../controllers/imageController';
import imgCachingMiddleware from '../utilities/imageCachingMiddleware';
import app from '..';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.send(welcomeMessage);
});

apiRoutes.get('/images', imgCachingMiddleware, loadImgAndResize);

export default apiRoutes;
