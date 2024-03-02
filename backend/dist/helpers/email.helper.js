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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../config/environment");
function sendEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('https://api.sendinblue.com/v3/smtp/email', {
                sender: {
                    name: `Gestores`,
                    email: 'register@gestores.com'
                },
                to: [
                    {
                        email: email.to,
                        name: 'Nuevo usuario'
                    }
                ],
                subject: email.subject,
                htmlContent: email.html,
                headers: {
                    'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
                    charset: 'iso-8859-1'
                }
            }, {
                headers: {
                    'accept': 'application/json',
                    'api-key': environment_1.SENDINBLUE_API_KEY,
                    'content-type': 'application/json'
                }
            });
            return { result: true, response };
        }
        catch (error) {
            return { result: false, error };
        }
    });
}
exports.default = sendEmail;
