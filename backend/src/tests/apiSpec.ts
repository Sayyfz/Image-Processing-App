import app from '../index';
import supertest from 'supertest';
import { welcomeMessage } from '../constants/constants';

const request = supertest(app);

describe('API related specs', () => {
    it('Expects /api endpoint to respond with ', async () => {
        const res = await request.get('/api');
        expect(res.text).toEqual(welcomeMessage);
    });

    it('Expects /api/images should return status code of 200', async () => {
        const res = await request.get('/api/images');
        expect(res.statusCode).toEqual(200);
    });
});
