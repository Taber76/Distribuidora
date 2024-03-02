"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const chatRouter = express_1.default.Router();
chatRouter.post('/open', auth_mid_1.default.authenticate('userJWT', { session: false }), chat_controller_1.default.open);
chatRouter.get('/getByParticipantId/:participant_id', auth_mid_1.default.authenticate('userJWT', { session: false }), chat_controller_1.default.getByParticipantId);
exports.default = chatRouter;
