"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controller_1 = __importDefault(require("../controllers/contact.controller"));
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const contactRouter = express_1.default.Router();
contactRouter.post('/register', auth_mid_1.default.authenticate('userJWT', { session: false }), contact_controller_1.default.register);
contactRouter.get('/getall', auth_mid_1.default.authenticate('userJWT', { session: false }), contact_controller_1.default.getAll);
contactRouter.get('/getbypartialmatch/:partialMatch', auth_mid_1.default.authenticate('userJWT', { session: false }), contact_controller_1.default.getByPartialMatch);
contactRouter.get('/getById/:contact_id', auth_mid_1.default.authenticate('userJWT', { session: false }), contact_controller_1.default.getById);
contactRouter.put('/update/:contact_id', auth_mid_1.default.authenticate('userJWT', { session: false }), contact_controller_1.default.update);
contactRouter.delete('/delete/:contact_id', auth_mid_1.default.authenticate('userJWT', { session: false }), contact_controller_1.default.delete);
exports.default = contactRouter;
