"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const environment_1 = require("./environment");
const mogodb_1 = __importDefault(require("./mogodb"));
const contact_route_1 = __importDefault(require("../routes/contact.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const item_route_1 = __importDefault(require("../routes/item.route"));
const order_route_1 = __importDefault(require("../routes/order.route"));
const invoice_route_1 = __importDefault(require("../routes/invoice.route"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.dataBase();
        this.middlewares();
        this.routes();
    }
    dataBase() {
        mogodb_1.default.getInstance();
    }
    middlewares() {
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        });
        this.app.use((0, cors_1.default)( //{
        //origin: CORS_ORIGIN,
        //methods: ['GET', 'POST', 'PUT', 'DELETE'],
        //credentials: true
        //}));
        ));
        this.app.use(express_1.default.json());
        this.app.use(limiter);
    }
    routes() {
        this.app.use('/api/v1/contact', contact_route_1.default);
        this.app.use('/api/v1/user', user_route_1.default);
        this.app.use('/api/v1/item', item_route_1.default);
        this.app.use('/api/v1/order', order_route_1.default);
        this.app.use('/api/v1/einvoice', invoice_route_1.default);
    }
    listen() {
        this.app.listen(environment_1.PORT, () => {
            console.log(`Server running on port ${environment_1.PORT}`);
        });
    }
}
exports.default = Server;
