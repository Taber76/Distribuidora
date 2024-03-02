"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
class MongoDB {
    constructor() {
        if (!environment_1.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined.');
        }
        const options = {
            serverSelectionTimeoutMS: 10000,
        };
        this.connection = mongoose_1.default.createConnection(environment_1.MONGODB_URI, options);
        this.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });
        this.connection.on('error', (err) => {
            console.error('Error connecting to MongoDB:', err);
        });
        this.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });
    }
    static getInstance() {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }
    getConnection() {
        return this.connection;
    }
}
exports.default = MongoDB;
