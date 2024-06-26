"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const itemRouter = express_1.default.Router();
itemRouter
    .post('/register', auth_mid_1.default.authenticate('userJWT', { session: false }), item_controller_1.default.register)
    .get('/getall', auth_mid_1.default.authenticate('userJWT', { session: false }), item_controller_1.default.getAll)
    .get('/getbypartialmatch/:partialMatch', auth_mid_1.default.authenticate('userJWT', { session: false }), item_controller_1.default.getByDescription)
    .get('/getbyid/:item_id', auth_mid_1.default.authenticate('userJWT', { session: false }), item_controller_1.default.getById)
    .put('/getdescriptions', auth_mid_1.default.authenticate('userJWT', { session: false }), item_controller_1.default.getDescriptions)
    .put('/update/:item_id', auth_mid_1.default.authenticate('userJWT', { session: false }), item_controller_1.default.update)
    .delete('/delete/:item_id', auth_mid_1.default.authenticate('adminJWT', { session: false }), item_controller_1.default.delete);
exports.default = itemRouter;
