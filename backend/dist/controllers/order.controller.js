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
const order_model_1 = __importDefault(require("../models/order.model"));
const language_loader_1 = __importDefault(require("../languages/language.loader"));
class orderController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_model_1.default.register(req.body);
                res.status(201).json(order);
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.order.register_error}: ${error}` });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_model_1.default.getAll();
                res.status(202).json({ orders });
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.order.get_error}: ${error}` });
            }
        });
    }
    getByField(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.filed && req.params.value) {
                    const field = req.params.field;
                    const orders = yield order_model_1.default.getByField(field, req.params.value);
                    res.status(200).json(orders);
                }
                else {
                    res.status(400).json({ error: language_loader_1.default.order.query_error });
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.order.order_not_found}: ${error}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_model_1.default.update(req.params.order_id, req.body);
                if (!order) {
                    res.status(404).json({ error: language_loader_1.default.order.order_not_found });
                }
                else {
                    res.status(202).json(order);
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.order.update_error}: ${error}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedOrder = yield order_model_1.default.delete(req.params.order_id);
                if (!deletedOrder) {
                    res.status(404).json({ error: language_loader_1.default.order.order_not_found });
                }
                else {
                    res.status(202).json(deletedOrder);
                }
            }
            catch (error) {
                res.status(500).json({ error: `${language_loader_1.default.order.delete_error}: ${error}` });
            }
        });
    }
}
exports.default = new orderController();
