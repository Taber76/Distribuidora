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
const item_schema_1 = require("../schemas/item.schema");
class ItemModel {
    constructor() {
        const connection = mogodb_1.default.getInstance().getConnection();
        this.model = connection.model('Item', item_schema_1.ItemSchema);
    }
    register(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = new this.model(itemData);
                const savedItem = yield newItem.save();
                return savedItem;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.model.find({ active: true });
                return items;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByDescription(partialMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.model.find({ description: { $regex: partialMatch, $options: 'i' }, active: true });
                return items;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.model.findById({ _id: id });
                return item;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getDescriptions(arrayOfIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let descriptions = {};
                for (let i = 0; i < arrayOfIds.length; i++) {
                    const item = yield this.model.findById(arrayOfIds[i]);
                    if (!item) {
                        descriptions[arrayOfIds[i]] = '';
                    }
                    else {
                        descriptions[arrayOfIds[i]] = item.description;
                    }
                }
                return descriptions;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(item_id, itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedItem = yield this.model.findByIdAndUpdate({ _id: item_id }, Object.assign(Object.assign({}, itemData), { updated_at: new Date() }), { new: true });
                return updatedItem;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(item_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedItem = yield this.model.findByIdAndUpdate({ _id: item_id }, { active: false }, { new: true });
                return deletedItem;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ItemModel();
