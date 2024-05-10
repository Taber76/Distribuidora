import { FilterQuery, Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IOrder, OrderSchema } from '../schemas/order.schema';

class OrderModel {
  private model: Model<IOrder>;

  constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IOrder>('Order', OrderSchema);
  }

  async register(orderData: IOrder): Promise<IOrder> {
    try {
      const newOrder = new this.model(orderData);
      const savedOrder = await newOrder.save();
      return savedOrder;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IOrder[]> {
    try {
      const orders = await this.model.find({ active: true });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getByField(field: keyof IOrder, value: any): Promise<IOrder[]> {
    try {
      const filter: FilterQuery<IOrder> = {};
      filter[field] = value;
      filter['active'] = true;
      const orders = await this.model.find(filter);
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getFiltered(filter: FilterQuery<IOrder>): Promise<IOrder[]> {
    try {
      filter['active'] = true;
      const orders = await this.model.find(filter);
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async update(order_id: string, orderData: IOrder): Promise<IOrder | null> {
    try {
      const updatedOrder = await this.model.findByIdAndUpdate(
        { _id: order_id },
        { ...orderData, updated_at: new Date() },
        { new: true });
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }

  async delete(order_id: string): Promise<IOrder | null> {
    try {
      const deletedOrder = await this.model.findByIdAndUpdate({ _id: order_id }, { active: false }, { new: true });
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  }

}

export default new OrderModel();