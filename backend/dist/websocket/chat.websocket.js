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
const redis_1 = __importDefault(require("../config/redis"));
const user_helper_1 = require("../helpers/user.helper");
const chatWebsocket = (io) => {
    io.on('connection', (socket) => {
        let authenticated = false;
        let user_id = '';
        socket.on('authenticate', (token) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, role } = (0, user_helper_1.checkJWT)(token);
            if (id && role) {
                authenticated = true;
                user_id = id;
                yield redis_1.default.getInstance().set(id, socket.id);
                socket.emit('authenticated');
            }
        }));
        socket.on('message', (msg, recipinet_id) => __awaiter(void 0, void 0, void 0, function* () {
            if (!authenticated) {
                return;
            }
            chat_model_1.default.addMessage(user_id, recipinet_id, msg);
            const recipientConnected = yield redis_1.default.getInstance().get(recipinet_id);
            if (recipientConnected) {
                io.to(recipientConnected).emit('message', msg, user_id);
            }
        }));
        socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
            redis_1.default.getInstance().set(user_id, null);
        }));
    });
};
exports.default = chatWebsocket;
