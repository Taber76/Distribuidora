"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const einvoice_controller_1 = __importDefault(require("../controllers/einvoice.controller"));
const einvoiceRouter = express_1.default.Router();
einvoiceRouter.post('/register', 
//passport.authenticate('adminJWT', { session: false }),
einvoice_controller_1.default.register);
exports.default = einvoiceRouter;
