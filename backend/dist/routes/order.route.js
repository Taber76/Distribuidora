"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const orderRouter = express_1.default.Router();
orderRouter.post('/register', auth_mid_1.default.authenticate('userJWT', { session: false }), order_controller_1.default.register)
    .get('/getAll', auth_mid_1.default.authenticate('userJWT', { session: false }), order_controller_1.default.getAll)
    .get('/getByField/:field/:value', auth_mid_1.default.authenticate('userJWT', { session: false }), order_controller_1.default.getByField)
    .post('/getFiltered', auth_mid_1.default.authenticate('userJWT', { session: false }), order_controller_1.default.getFiltered)
    .put('/update/:order_id', auth_mid_1.default.authenticate('userJWT', { session: false }), order_controller_1.default.update)
    .delete('/delete/:order_id', auth_mid_1.default.authenticate('adminJWT', { session: false }), order_controller_1.default.delete);
exports.default = orderRouter;
