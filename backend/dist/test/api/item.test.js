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
describe('Item', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).post('/api/v1/user/login').send({
            username: 'Administrador',
            password: '12345678Aa'
        });
        token = response.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_1.default.close();
    }));
    /*
    
      it('should return unauthorized without token', async () => {
        let response = await request(server.app).get('/api/v1/item/getall');
        expect(response.status).toBe(401);
    
        response = await request(server.app).get('/api/v1/item/getbyid/123');
        expect(response.status).toBe(401);
    
        response = await request(server.app).get('/api/v1/item/getbydescription');
        expect(response.status).toBe(401);
    
        response = await request(server.app).put('/api/v1/item/update');
        expect(response.status).toBe(401);
    
        response = await request(server.app).delete('/api/v1/item/delete/123');
        expect(response.status).toBe(401);
      });
    */
    it('should return all items', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).get('/api/v1/item/getall').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(202);
        expect(response.body.items.length).toBeGreaterThan(0);
    }));
});
