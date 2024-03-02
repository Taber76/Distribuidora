"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToUser = exports.checkJWT = exports.createJWT = exports.checkPassword = exports.validateAndHashPassword = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../config/environment");
const email_helper_1 = __importDefault(require("./email.helper"));
function validateAndHashPassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!re.test(password)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    return hashPassword;
}
exports.validateAndHashPassword = validateAndHashPassword;
function checkPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}
exports.checkPassword = checkPassword;
function createJWT(id, role) {
    return jsonwebtoken_1.default.sign({ id, role }, environment_1.JWT_SECRET, { expiresIn: environment_1.JWT_EXPIRES_IN });
}
exports.createJWT = createJWT;
function checkJWT(token) {
    const payload = jsonwebtoken_1.default.verify(token, environment_1.JWT_SECRET);
    return payload;
}
exports.checkJWT = checkJWT;
function sendEmailToUser(from, email, username, subject, text, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailResponse = yield (0, email_helper_1.default)({
            from: from,
            to: email,
            subject: subject,
            text: text,
            html: `<html><head></head><body>
            <p>Hola ${username}, confirma tu cuenta en Gestores</p>
            <p>
              Tu cuenta ya esta casi lista, solo debes confirmarla
              en el siguiente enlace: <a href="backend_url/api/users/confirm/${token}">confirmar mi cuenta</a>
            </p>
            <p>Si no te has registrado en Gestores ignora el mensaje por favor.</p>
          </body></html>`,
        });
        if (!emailResponse.result) {
            throw new Error('Error sending email');
        }
    });
}
exports.sendEmailToUser = sendEmailToUser;
