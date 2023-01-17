import app from '../index';
import supertest from 'supertest';
import { welcomeMessage } from '../constants/constants';

const request = supertest(app);

describe('API related specs', () => {
    it(`Expects /api endpoint to respond with ${welcomeMessage}`, async () => {
        const res = await request.get('/api');
        expect(res.text).toEqual(welcomeMessage);
    });

    it('Expects /api/images should return status code of 200', async () => {
        const res = await request.get('/api/images');
        expect(res.statusCode).toEqual(200);
    });

    it('Expects error message that specifies that there is no file with such name returned from endpoint /api/images?filename=ssssss&width=200&height=200', async () => {
        const res = await request.get('/api/images?filename=ssssss&width=200&height=200');
        expect(res.error).toBeTruthy();
    });

    it('Expects buffer data to be returned from endpoint /api/images?filename=fjord&width=200&height=200', async () => {
        const res = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(res.body).toBeTruthy();
    });
});
