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
const contact_schema_1 = require("../schemas/contact.schema");
class ContactModel {
    constructor() {
        const connection = mogodb_1.default.getInstance().getConnection();
        this.model = connection.model('Contact', contact_schema_1.ContactSchema);
    }
    register(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = new this.model(contactData);
                const savedContact = yield newContact.save();
                return savedContact;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield this.model.find();
                return contacts;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByPartialMatch(partialMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield this.model.find({ name: { $regex: partialMatch, $options: 'i' } });
                return contacts;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield this.model.findById(id);
                return contact;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                contactData.updated_at = new Date();
                const updatedContact = yield this.model.findByIdAndUpdate(contactData._id, contactData, { new: true, runValidators: true });
                return updatedContact;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedContact = yield this.model.findByIdAndDelete(id);
                return deletedContact;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ContactModel();
