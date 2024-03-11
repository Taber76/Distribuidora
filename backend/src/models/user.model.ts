import { Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IUser, UserSchema } from '../schemas/user.schema';

class UserModel {
  private model: Model<IUser>;

  public constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IUser>('User', UserSchema);
  }

  public async login(username: string): Promise<IUser | null> {
    try {
      let user = null;
      if (username) {
        user = await this.model.findOne({ username }).select('+password');
        if (!user) {
          user = await this.model.findOne({ email: username }).select('+password');
        }
      }
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async register(userData: IUser): Promise<IUser> {
    try {
      const newUser = new this.model(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<IUser | null> {
    try {
      const user = await this.model.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getAll(): Promise<IUser[]> {
    try {
      const users = await this.model.find({ active: true });
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async update(userData: IUser): Promise<IUser | null> {
    try {
      const { _id, secure_password, created_at, ...dataToUpdate } = userData;
      dataToUpdate.updated_at = new Date();
      const updatedUser = await this.model.findByIdAndUpdate(userData._id, dataToUpdate, { new: true, runValidators: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  public async updatePassword(user_id: string, password: string): Promise<IUser | null> {
    try {
      const updatedUser = await this.model.findByIdAndUpdate(user_id, { password }, { new: true, runValidators: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<IUser | null> {
    try {
      const deletedUser = await this.model.findByIdAndUpdate(id, { active: false }, { new: true });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

}

export default new UserModel();