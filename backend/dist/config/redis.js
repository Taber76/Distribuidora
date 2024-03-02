"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const environment_1 = require("./environment");
// Redis { user_id, socket_id }
class RedisDB {
    constructor() {
        this.client = (0, redis_1.createClient)({
            password: environment_1.REDIS_PW,
            socket: {
                host: environment_1.REDIS_HOST,
                port: 14836,
            },
        });
        this.client.connect();
        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });
        this.client.on('error', (err) => {
            console.error('Error connecting to Redis:', err);
        });
    }
    static getInstance() {
        if (!RedisDB.instance) {
            RedisDB.instance = new RedisDB();
        }
        return RedisDB.instance;
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.set(key, value);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.client.get(key);
            return value;
        });
    }
}
exports.default = RedisDB;
