import { Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IContact, ContactSchema } from '../schemas/contact.schema';

class ContactModel {
  private model: Model<IContact>;

  public constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IContact>('Contact', ContactSchema);
  }

  public async register(contactData: IContact): Promise<IContact> {
    try {
      const newContact = new this.model(contactData);
      const savedContact = await newContact.save();
      return savedContact;
    } catch (error) {
      throw error;
    }
  }

  public async getAll(partialMatch: string): Promise<IContact[]> {
    try {
      const contacts = await this.model.find({ name: { $regex: partialMatch, $options: 'i' } });
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<IContact | null> {
    try {
      const contact = await this.model.findById(id);
      return contact;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, contactData: IContact): Promise<IContact | null> {
    try {
      contactData.updated_at = new Date();
      const updatedContact = await this.model.findByIdAndUpdate(id, contactData, { new: true, runValidators: true });
      return updatedContact;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<IContact | null> {
    try {
      const deletedContact = await this.model.findByIdAndDelete(id);
      return deletedContact;
    } catch (error) {
      throw error;
    }
  }

}

export default new ContactModel();