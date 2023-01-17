"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const constants_1 = require("../constants/constants");
const request = (0, supertest_1.default)(index_1.default);
describe('API related specs', () => {
    it(`Expects /api endpoint to respond with ${constants_1.welcomeMessage}`, async () => {
        const res = await request.get('/api');
        expect(res.text).toEqual(constants_1.welcomeMessage);
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
