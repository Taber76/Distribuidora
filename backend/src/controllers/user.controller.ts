import { Request, Response } from 'express';

import { AuthenticatedUser } from '../types/user.type';
import userModelInstance from '../models/user.model';
import { validateAndHashPassword, checkPassword, createJWT, sendEmailToUser } from '../helpers/user.helper';
import language from '../languages/language.loader';
import { MODE } from '../config/environment';

class UserController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      req.body.password = validateAndHashPassword("Aa12345678");
      const user = await userModelInstance.register(req.body);
      user.password = '';
      const token = createJWT(user.id, user.role);
      //await sendEmailToUser("Registro usuario Gestores", user.email, user.username, 'Gestores - Registro', 'Confirma tu email', token);
      res.status(201).json({ message: language.user.register_success, user, token });
    } catch (error) {
      res.status(500).json({ error: `${language.user.register_error}: ${error}` });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      if (MODE === 'dev') {
        const token = createJWT('1', 'ADMIN');
        res.status(202).json({ token, user: { id: '1', role: 'ADMIN', username: req.body.username }, message: language.user.login_success });
        return
      }
      const user = await userModelInstance.login(req.body.username);
      if (!user) {
        res.status(404).json({ error: language.user.user_not_found });
      } else if (!checkPassword(req.body.password, user.password)) {
        res.status(401).json({ error: language.user.invalid_password });
      } else if (req.body.password == 'Aa12345678') {
        const token = createJWT(user.id, user.role);
        res.status(302).json({ token, user, error: language.user.change_password });
      } else {
        const token = createJWT(user.id, user.role);
        user.password = '';
        res.status(202).json({ token, user, message: language.user.login_success });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.user.login_error}: ${error}` });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userModelInstance.getById(req.params.user_id);
      if (!user) {
        res.status(404).json({ error: language.user.user_not_found });
      } else {
        res.status(202).json({ user });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.user.get_error}: ${error}` });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userModelInstance.getAll();
      res.status(202).json({ users });
    } catch (error) {
      res.status(500).json({ error: `${language.user.get_error}: ${error}` });
    }
  }

  public async getByToken(req: Request, res: Response): Promise<void> {
    try {
      const user = await userModelInstance.getById((req.user as AuthenticatedUser).id);
      if (!user) {
        res.status(404).json({ error: language.user.user_not_found });
      }
      res.status(202).json({ user });
    } catch (error) {
      res.status(500).json({ error: `${language.user.get_error}: ${error}` });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      if (req.body.password) {
        req.body.password = validateAndHashPassword(req.body.password);
      }
      const updatedUser = await userModelInstance.update(req.body);
      if (!updatedUser) {
        res.status(404).json({ error: language.user.user_not_found });
      } else {
        res.status(202).json({ updatedUser });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${language.user.update_error}: ${error}` });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await userModelInstance.delete(req.params.user_id);
      if (!deletedUser) {
        res.status(404).json({ error: language.user.user_not_found });
      } else {
        res.status(202).json({ deletedUser });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.user.delete_error}: ${error}` });
    }
  }


}

export default new UserController();