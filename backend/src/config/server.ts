import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import { PORT, CORS_ORIGIN } from './environment';
import MongoDB from './mogodb';
import contactRouter from '../routes/contact.route';
import userRouter from '../routes/user.route';
import itemRouter from '../routes/item.route';
import orderRouter from '../routes/order.route';
import einvoiceRouter from '../routes/invoice.route';

export default class Server {
  public app: express.Application;
  private server: any;

  constructor() {
    this.app = express();
    this.dataBase();
    this.middlewares();
    this.routes();
    this.listen();
  }

  private dataBase() {
    MongoDB.getInstance();
  }

  private middlewares() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    });
    this.app.use(cors({
      origin: CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(limiter);
  }

  private routes() {
    this.app.use('/api/v1/contact', contactRouter);
    this.app.use('/api/v1/user', userRouter);
    this.app.use('/api/v1/item', itemRouter);
    this.app.use('/api/v1/order', orderRouter);
    this.app.use('/api/v1/einvoice', einvoiceRouter);
  }

  private listen() {
    this.server = this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  async close() {
    await MongoDB.getInstance().close();
    this.server.close();
  }
}

