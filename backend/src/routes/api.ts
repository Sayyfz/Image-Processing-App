import express from 'express';
import { welcomeMessage } from '../constants/constants';
import { loadImgAndResize } from '../controllers/imageController';
import imgValidationAndCacheMiddleware from '../utilities/imgValidationAndCacheMiddleware';

const apiRoutes = express.Router();

apiRoutes.get('/', (req: express.Request, res: express.Response): express.Response => {
    return res.send(welcomeMessage);
});

apiRoutes.get('/images', imgValidationAndCacheMiddleware, loadImgAndResize);

export default apiRoutes;
