"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const einvoice_controller_1 = __importDefault(require("../controllers/einvoice.controller"));
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const einvoiceRouter = express_1.default.Router();
einvoiceRouter.post('/einvoice/register', auth_mid_1.default.authenticate('adminJWT', { session: false }), einvoice_controller_1.default.register);
exports.default = einvoiceRouter;
