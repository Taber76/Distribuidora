"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const environment_1 = require("../config/environment");
const loadTranslations = (language) => {
    const filePath = path_1.default.join(__dirname, `${language}.json`);
    if (fs_1.default.existsSync(filePath)) {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    }
    return fs_1.default.readFileSync(path_1.default.join(__dirname, 'en.json'), 'utf8');
};
const language = loadTranslations(environment_1.LANGUAGE);
exports.default = language;
