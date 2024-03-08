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

  public async getAll(): Promise<IContact[]> {
    try {
      const contacts = await this.model.find({ active: true });
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  public async getByPartialMatch(partialMatch: string): Promise<IContact[]> {
    try {
      const contacts = await this.model.find({ name: { $regex: partialMatch, $options: 'i' }, active: true });
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<IContact | null> {
    try {
      const contact = await this.model.findOne({ _id: id, active: true })
      return contact;
    } catch (error) {
      throw error;
    }
  }

  public async update(contactData: IContact): Promise<IContact | null> {
    try {
      contactData.updated_at = new Date();
      const updatedContact = await this.model.findByIdAndUpdate(contactData._id, contactData, { new: true, runValidators: true });
      return updatedContact;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<IContact | null> {
    try {
      const deletedContact = await this.model.findByIdAndUpdate(id, { active: false }, { new: true });
      return deletedContact;
    } catch (error) {
      throw error;
    }
  }

}

export default new ContactModel();