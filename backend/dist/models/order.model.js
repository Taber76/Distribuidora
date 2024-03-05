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
const order_schema_1 = require("../schemas/order.schema");
class OrderModel {
    constructor() {
        const connection = mogodb_1.default.getInstance().getConnection();
        this.model = connection.model('Order', order_schema_1.OrderSchema);
    }
    register(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = new this.model(orderData);
                const savedOrder = yield newOrder.save();
                return savedOrder;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.model.find();
                return orders;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByField(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = {};
                filter[field] = value;
                const orders = yield this.model.find(filter);
                return orders;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getFiltered(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(filter);
                const orders = yield this.model.find(filter);
                return orders;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(order_id, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedOrder = yield this.model.findByIdAndUpdate({ _id: order_id }, Object.assign(Object.assign({}, orderData), { updated_at: new Date() }), { new: true });
                return updatedOrder;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedOrder = yield this.model.findByIdAndDelete({ _id: order_id });
                return deletedOrder;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new OrderModel();
