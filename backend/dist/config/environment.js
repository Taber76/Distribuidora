"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGE = exports.REDIS_HOST = exports.REDIS_PW = exports.SENDINBLUE_API_KEY = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.JWT_SECRET = process.env.JWT_SECRET || 'JWT Secret';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
exports.SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY;
exports.REDIS_PW = process.env.REDIS_PW;
exports.REDIS_HOST = process.env.REDIS_HOST;
exports.LANGUAGE = process.env.LANGUAGE || 'sp';
