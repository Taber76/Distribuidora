"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ChatSchema = new mongoose_1.Schema({
    participants: [{
            id: { type: String, required: true },
            username: { type: String, required: true },
            unreaded: { type: Boolean, default: false }
        }],
    messages: [{
            sender_id: { type: String, required: true },
            text: { type: String, required: true },
            readed: { type: Boolean, default: false },
            timestamp: { type: Date, default: Date.now }
        }]
});
