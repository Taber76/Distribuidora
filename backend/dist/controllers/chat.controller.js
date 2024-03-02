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
const chat_model_1 = __importDefault(require("../models/chat.model"));
class ChatController {
    open(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // body { participants: [{id, username}, {id, username}] }
                const chat = yield chat_model_1.default.getByTwoParticipants(req.body.participants);
                if (!chat) {
                    yield chat_model_1.default.create(req.body.participants);
                }
                res.status(200).json(chat);
            }
            catch (error) {
                res.status(500).json({ error: `Error to open chat: ${error}` });
            }
        });
    }
    getByParticipantId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield chat_model_1.default.getByParticipantId(req.params.participant_id);
                res.status(200).json(chats);
            }
            catch (error) {
                res.status(500).json({ error: `Error to get chat: ${error}` });
            }
        });
    }
}
exports.default = new ChatController();
