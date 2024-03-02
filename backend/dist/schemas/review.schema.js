"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    sender_id: { type: String, required: true },
    recipient_id: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
