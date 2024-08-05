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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe('User', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_1.default.close();
    }));
    it('should return unauthorized without token', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.default.app).get('/api/v1/user/getall');
        expect(response.status).toBe(401);
        response = yield (0, supertest_1.default)(app_1.default.app).get('/api/v1/user/getbyid/123');
        expect(response.status).toBe(401);
        response = yield (0, supertest_1.default)(app_1.default.app).get('/api/v1/user/getbytoken');
        expect(response.status).toBe(401);
        response = yield (0, supertest_1.default)(app_1.default.app).put('/api/v1/user/update');
        expect(response.status).toBe(401);
        response = yield (0, supertest_1.default)(app_1.default.app).put('/api/v1/user/updatepassword');
        expect(response.status).toBe(401);
        response = yield (0, supertest_1.default)(app_1.default.app).delete('/api/v1/user/delete/123');
        expect(response.status).toBe(401);
    }));
    it('should return user not found on login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).post('/api/v1/user/login').send({
            username: 'Administrado',
            password: '12345678Aa'
        });
        expect(response.status).toBe(404);
    }));
    it('should return invalid password on login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).post('/api/v1/user/login').send({
            username: 'Administrador',
            password: '12345678A'
        });
        expect(response.status).toBe(401);
    }));
    let token;
    it('should return a token on login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).post('/api/v1/user/login').send({
            username: 'Administrador',
            password: '12345678Aa'
        });
        token = response.body.token;
        expect(token).toBeDefined();
        expect(response.status).toBe(202);
    }));
    let user_id;
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).get('/api/v1/user/getall').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(202);
        expect(response.body.users.length).toBeGreaterThan(0);
        user_id = response.body.users[0]._id;
    }));
    let keys = ['_id', 'role', 'username', 'active', 'name', 'email'];
    it('should return a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).get(`/api/v1/user/getbyid/${user_id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(202);
        expect(response.body.user._id).toBe(user_id);
        keys.forEach(key => expect(response.body.user[key]).toBeDefined());
    }));
    it('should return error on invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).get('/api/v1/user/getbyid/123').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(500);
    }));
});
