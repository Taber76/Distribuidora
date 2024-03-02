"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    purchase_price: { type: Number, required: false },
    sale_price: { type: Number, required: false },
    profit_margin: { type: Number, required: false },
    stock: { type: Number, required: false },
    supliers_id: [{ type: String, required: false }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
