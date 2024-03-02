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
const mogodb_1 = __importDefault(require("../config/mogodb"));
const chat_schema_1 = require("../schemas/chat.schema");
class ChatModel {
    constructor() {
        const connection = mogodb_1.default.getInstance().getConnection();
        this.model = connection.model('Chat', chat_schema_1.ChatSchema);
    }
    create(participants) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newChat = new this.model({ participants, messages: [] });
                const savedChat = yield newChat.save();
                return savedChat;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByParticipantId(participant_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield this.model.find({ 'participants.id': participant_id }, 'participants');
                if (!chats) {
                    return null;
                }
                let otherParticipant = [];
                chats.forEach(chat => {
                    chat.participants.forEach(participant => {
                        if (participant.id !== participant_id) {
                            otherParticipant.push(participant);
                        }
                    });
                });
                return otherParticipant;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByTwoParticipants(participants) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield this.model.findOne({
                    'participants.id': { $all: [participants[0].id, participants[1].id] }
                });
                if (!chat) {
                    return null;
                }
                // cuando abro un chat, lo pongo como leido
                const index = chat.participants.findIndex(participant => participant.id === participants[0].id);
                chat.participants[index].unreaded = false;
                yield chat.save();
                return chat;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addMessage(participant_id_1, participant_id_2, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.updateOne({
                    'participants.id': { $all: [participant_id_1, participant_id_2] }
                }, {
                    $push: {
                        messages: {
                            sender_id: participant_id_1,
                            text,
                        }
                    }
                });
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ChatModel();
