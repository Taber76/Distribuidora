import { Request, Response } from 'express';

import orderModelInstance from '../models/order.model';
import language from '../languages/language.loader';
import { IOrder } from '../schemas/order.schema';

class orderController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const order = await orderModelInstance.register(req.body);
      res.status(201).json(order);
    }
    catch (error) {
      console.log(error)
      res.status(500).json({ error: `${language.order.register_error}: ${error}` });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderModelInstance.getAll();
      res.status(202).json({ orders });
    } catch (error) {
      res.status(500).json({ error: `${language.order.get_error}: ${error}` });
    }
  }

  public async getByField(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.filed && req.params.value) {
        const field = req.params.field as keyof IOrder;
        const orders = await orderModelInstance.getByField(field, req.params.value);
        res.status(202).json(orders);
      } else {
        res.status(400).json({ error: language.order.query_error });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.order.order_not_found}: ${error}` });
    }
  }

  public async getFiltered(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderModelInstance.getFiltered(req.body);
      res.status(202).json({ orders });
    } catch (error) {
      res.status(500).json({ error: `${language.order.order_not_found}: ${error}` });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const order = await orderModelInstance.update(req.params.order_id, req.body);
      if (!order) {
        res.status(404).json({ error: language.order.order_not_found });
      } else {
        res.status(202).json(order);
      }
    } catch (error) {
      res.status(500).json({ error: `${language.order.update_error}: ${error}` });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedOrder = await orderModelInstance.delete(req.params.order_id);
      if (!deletedOrder) {
        res.status(404).json({ error: language.order.order_not_found });
      } else {
        res.status(202).json(deletedOrder);
      }
    } catch (error) {
      res.status(500).json({ error: `${language.order.delete_error}: ${error}` });
    }
  }


}


export default new orderController()