"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PurchaseSchema = new mongoose_1.Schema({
    supplier_id: { type: String, required: true },
    items: [{
            item_id: { type: String, required: true },
        }],
    observation: { type: String, required: false },
    status: {
        type: String,
        required: true,
        enum: ['PENDING', 'PARTIAL', 'FINISHED', 'CANCELED']
    },
    invoices_number: [{ type: String, required: false }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    finished_at: { type: Date, default: Date.now },
});
