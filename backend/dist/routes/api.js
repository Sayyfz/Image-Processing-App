"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants/constants");
const imageController_1 = require("../controllers/imageController");
const imageCachingMiddleware_1 = __importDefault(require("../utilities/imageCachingMiddleware"));
const apiRoutes = express_1.default.Router();
apiRoutes.get('/', (req, res) => {
    res.send(constants_1.welcomeMessage);
});
apiRoutes.get('/images', imageCachingMiddleware_1.default, imageController_1.loadImgAndResize);
exports.default = apiRoutes;
