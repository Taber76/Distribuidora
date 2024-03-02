"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import { Server } from 'socket.io';
//import http from 'http';
const environment_1 = require("./config/environment");
const mogodb_1 = __importDefault(require("./config/mogodb"));
//import RedisDB from './config/redis';
const contact_route_1 = __importDefault(require("./routes/contact.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const item_route_1 = __importDefault(require("./routes/item.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
//import chatWebsocket from './websocket/chat.websocket';
const app = (0, express_1.default)();
//const server = http.createServer(app);
//const io = new Server(server);
// ---------- Database connection --
mogodb_1.default.getInstance();
//RedisDB.getInstance()
// ---------- Middlewares ----------
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ---------- Routes ---------------
app.use('/api/v1/contact', contact_route_1.default);
app.use('/api/v1/user', user_route_1.default);
app.use('/api/v1', item_route_1.default);
app.use('/api/v1/order', order_route_1.default);
// ---------- Websocket ------------
//chatWebsocket(io);
// ---------- Start server ---------
app.listen(environment_1.PORT, () => {
    console.log(`Server running on port ${environment_1.PORT}`);
});
exports.default = app;
