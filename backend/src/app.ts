import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
//import { Server } from 'socket.io';
//import http from 'http';

import { PORT } from './config/environment';
import MongoDB from './config/mogodb';
//import RedisDB from './config/redis';
import contactRouter from './routes/contact.route';
import userRouter from './routes/user.route';
import itemRouter from './routes/item.route';
import orderRouter from './routes/order.route';
//import chatWebsocket from './websocket/chat.websocket';

const app = express();
//const server = http.createServer(app);
//const io = new Server(server);

// ---------- Database connection --
MongoDB.getInstance()
//RedisDB.getInstance()

// ---------- Middlewares ----------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(express.json());
app.use(cors());

// ---------- Routes ---------------
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1', itemRouter);
app.use('/api/v1/order', orderRouter);

// ---------- Websocket ------------
//chatWebsocket(io);

// ---------- Start server ---------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export default app