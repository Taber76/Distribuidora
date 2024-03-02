"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    client_id: { type: String, required: false },
    client_name: { type: String, required: false },
    user_id: { type: String, required: true },
    items: [{
            item_id: { type: String, required: true },
        }],
    discount: { type: Number, required: false },
    observation: { type: String, required: false },
    status: {
        type: String,
        required: true,
        enum: ['PENDING', 'IN_PROGRESS', 'FINISHED', 'CANCELED', 'BILLED']
    },
    invoice_number: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    finished_at: { type: Date, default: Date.now },
});
