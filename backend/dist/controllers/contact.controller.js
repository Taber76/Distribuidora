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
const contact_model_1 = __importDefault(require("../models/contact.model"));
const language_loader_1 = __importDefault(require("../languages/language.loader"));
class ContactController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_model_1.default.register(req.body);
                res.status(201).json({ message: language_loader_1.default.contact.register_success, contact: contact });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.contact.register_error}: ${error}` });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield contact_model_1.default.getAll();
                res.status(202).json({ contacts });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.contact.contact_not_found}: ${error}` });
            }
        });
    }
    getByPartialMatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield contact_model_1.default.getByPartialMatch(String(req.params.partialMatch));
                res.status(202).json({ contacts });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.contact.contact_not_found}: ${error}` });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_model_1.default.getById(req.params.id);
                if (!contact) {
                    res.status(404).json({ error: language_loader_1.default.contact.contact_not_found });
                }
                else {
                    res.status(200).json({ contact });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.contact.contact_not_found}: ${error}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContact = yield contact_model_1.default.update(req.params.contact_id, req.body);
                if (!updatedContact) {
                    res.status(404).json({ error: language_loader_1.default.contact.contact_not_found });
                }
                else {
                    res.status(202).json({ updatedContact });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.contact.update_error}: ${error}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedContact = yield contact_model_1.default.delete(req.params.contact_id);
                if (!deletedContact) {
                    res.status(404).json({ error: language_loader_1.default.contact.contact_not_found });
                }
                else {
                    res.status(202).json({ deletedContact });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.contact.delete_error}: ${error}` });
            }
        });
    }
}
exports.default = new ContactController();
