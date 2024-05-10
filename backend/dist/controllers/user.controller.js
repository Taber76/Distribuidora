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
const user_model_1 = __importDefault(require("../models/user.model"));
const user_helper_1 = require("../helpers/user.helper");
const language_loader_1 = __importDefault(require("../languages/language.loader"));
const environment_1 = require("../config/environment");
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.password = (0, user_helper_1.validateAndHashPassword)("Aa12345678");
                const user = yield user_model_1.default.register(req.body);
                user.password = '';
                const token = (0, user_helper_1.createJWT)(user.id, user.role);
                //await sendEmailToUser("Registro usuario Gestores", user.email, user.username, 'Gestores - Registro', 'Confirma tu email', token);
                res.status(201).json({ message: language_loader_1.default.user.register_success, user, token });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.user.register_error}: ${error}` });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (environment_1.MODE === 'dev') {
                    const token = (0, user_helper_1.createJWT)('1', 'ADMIN');
                    res.status(202).json({ token, user: { id: '1', role: 'ADMIN', username: req.body.username }, message: language_loader_1.default.user.login_success });
                    return;
                }
                const user = yield user_model_1.default.login(req.body.username);
                if (!user) {
                    res.status(404).json({ error: language_loader_1.default.user.user_not_found });
                }
                else if (!(0, user_helper_1.checkPassword)(req.body.password, user.password)) {
                    res.status(401).json({ error: language_loader_1.default.user.invalid_password });
                }
                else if (req.body.password == 'Aa12345678') {
                    const token = (0, user_helper_1.createJWT)(user.id, user.role);
                    res.status(302).json({ token, user, error: language_loader_1.default.user.change_password });
                }
                else {
                    const token = (0, user_helper_1.createJWT)(user.id, user.role);
                    user.password = '';
                    res.status(202).json({ token, user, message: language_loader_1.default.user.login_success });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.user.login_error}: ${error}` });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.getById(req.params.user_id);
                if (!user) {
                    res.status(404).json({ error: language_loader_1.default.user.user_not_found });
                }
                else {
                    res.status(202).json({ user });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.user.get_error}: ${error}` });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.getAll();
                res.status(202).json({ users });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.user.get_error}: ${error}` });
            }
        });
    }
    static getByToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.getById(req.user.id);
                if (!user) {
                    res.status(404).json({ error: language_loader_1.default.user.user_not_found });
                }
                res.status(202).json({ user });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.user.get_error}: ${error}` });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.password) {
                    req.body.password = (0, user_helper_1.validateAndHashPassword)(req.body.password);
                }
                const updatedUser = yield user_model_1.default.update(req.body);
                if (!updatedUser) {
                    res.status(404).json({ error: language_loader_1.default.user.user_not_found });
                }
                else {
                    res.status(202).json({ updatedUser });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: `${language_loader_1.default.user.update_error}: ${error}` });
            }
        });
    }
    static updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const newPassword = (0, user_helper_1.validateAndHashPassword)(req.body.password);
                const updatedUser = yield user_model_1.default.updatePassword(req.body.user_id, newPassword);
                if (!updatedUser) {
                    res.status(404).json({ error: language_loader_1.default.user.user_not_found });
                }
                else {
                    res.status(202).json({ updatedUser });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.user.update_error}: ${error}` });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user_model_1.default.delete(req.params.user_id);
                if (!deletedUser) {
                    res.status(404).json({ error: language_loader_1.default.user.user_not_found });
                }
                else {
                    res.status(202).json({ deletedUser });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.user.delete_error}: ${error}` });
            }
        });
    }
}
exports.default = UserController;
