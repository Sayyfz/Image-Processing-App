import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Main Spec', () => {
    it('Should print 5', () => {
        expect(5).toEqual(5);
    });

    it('api test', async () => {
        const res = await request.get('/');
        expect(res.statusCode).toEqual(200);
    });
});
