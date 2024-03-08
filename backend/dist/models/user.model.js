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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mogodb_1 = __importDefault(require("../config/mogodb"));
const user_schema_1 = require("../schemas/user.schema");
class UserModel {
    constructor() {
        const connection = mogodb_1.default.getInstance().getConnection();
        this.model = connection.model('User', user_schema_1.UserSchema);
    }
    login(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = null;
                if (username) {
                    user = yield this.model.findOne({ username }).select('+password');
                    if (!user) {
                        user = yield this.model.findOne({ email: username }).select('+password');
                    }
                }
                return user;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new this.model(userData);
                const savedUser = yield newUser.save();
                return savedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.findById(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.model.find({ active: true });
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, secure_password, created_at } = userData, dataToUpdate = __rest(userData, ["_id", "secure_password", "created_at"]);
                dataToUpdate.updated_at = new Date();
                const updatedUser = yield this.model.findByIdAndUpdate(userData._id, dataToUpdate, { new: true, runValidators: true });
                return updatedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield this.model.findByIdAndUpdate(id, { active: false }, { new: true });
                return deletedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new UserModel();
