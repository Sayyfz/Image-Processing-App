"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('API related specs', () => {
    it('Expects / endpoint to have a status code of 200', async () => {
        const res = await request.get('/');
        expect(res.text).toEqual('hello');
    });
    it('Expects /api/images should return status code of 200', async () => {
        const res = await request.get('/api/images');
        expect(res.statusCode).toEqual(200);
    });
});
