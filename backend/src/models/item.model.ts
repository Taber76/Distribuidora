import { Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IItem, ItemSchema } from '../schemas/item.schema';

class ItemModel {
  private model: Model<IItem>;

  public constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IItem>('Item', ItemSchema);
  }

  public async register(itemData: IItem): Promise<IItem> {
    try {
      const newItem = new this.model(itemData);
      const savedItem = await newItem.save();
      return savedItem;
    } catch (error) {
      throw error;
    }
  }

  public async getAll(): Promise<IItem[]> {
    try {
      const items = await this.model.find();
      return items;
    } catch (error) {
      throw error;
    }
  }

  public async getByDescription(partialMatch: string): Promise<IItem[]> {
    try {
      const items = await this.model.find({ description: { $regex: partialMatch, $options: 'i' } });
      return items;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<IItem | null> {
    try {
      const item = await this.model.findById({ _id: id });
      return item;
    } catch (error) {
      throw error;
    }
  }

  public async getDescriptions(arrayOfIds: string[]): Promise<Record<string, string>> {
    try {
      let descriptions: Record<string, string> = {};
      for (let i = 0; i < arrayOfIds.length; i++) {
        const item = await this.model.findById(arrayOfIds[i]);
        if (!item) {
          descriptions[arrayOfIds[i]] = '';
        } else {
          descriptions[arrayOfIds[i]] = item.description;
        }
      }
      return descriptions;
    } catch (error) {
      throw error;
    }
  }


  public async update(item_id: string, itemData: IItem): Promise<IItem | null> {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        { _id: item_id },
        { ...itemData, updated_at: new Date() },
        { new: true });
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }

  public async delete(item_id: string): Promise<IItem | null> {
    try {
      const deletedItem = await this.model.findByIdAndDelete({ _id: item_id });
      return deletedItem;
    } catch (error) {
      throw error;
    }
  }

}

export default new ItemModel();