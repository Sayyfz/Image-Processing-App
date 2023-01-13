import express from 'express';
import { welcomeMessage } from '../constants/constants';
import { loadImgAndResize } from '../controllers/imageController';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.send(welcomeMessage);
});

apiRoutes.get('/images', loadImgAndResize);

export default apiRoutes;
