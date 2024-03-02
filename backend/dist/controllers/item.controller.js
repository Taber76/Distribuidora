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
const item_model_1 = __importDefault(require("../models/item.model"));
const language_loader_1 = __importDefault(require("../languages/language.loader"));
class ItemController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.description = String(req.body.description).toUpperCase();
                const item = yield item_model_1.default.register(req.body);
                res.status(201).json({ item });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.item.register_error}: ${error}` });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield item_model_1.default.getAll();
                res.status(202).json({ items });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.item.item_not_found}: ${error}` });
            }
        });
    }
    getByDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield item_model_1.default.getByDescription(String(req.params.partialMatch).toUpperCase());
                res.status(200).json({ items });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.item.item_not_found}: ${error}` });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield item_model_1.default.getById(req.params.item_id);
                if (!item) {
                    res.status(404).json({ error: language_loader_1.default.item.item_not_found });
                }
                else {
                    res.status(200).json({ item });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.item.item_not_found}: ${error}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.description = String(req.body.description).toUpperCase();
                const item = yield item_model_1.default.update(req.params.item_id, req.body);
                if (!item) {
                    res.status(404).json({ error: language_loader_1.default.item.item_not_found });
                }
                else {
                    res.status(202).json({ item });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.item.update_error}: ${error}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedItem = yield item_model_1.default.delete(req.params.item_id);
                if (!deletedItem) {
                    res.status(404).json({ error: language_loader_1.default.item.item_not_found });
                }
                else {
                    res.status(202).json({ deletedItem });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.item.delete_error}: ${error}` });
            }
        });
    }
}
exports.default = new ItemController();
