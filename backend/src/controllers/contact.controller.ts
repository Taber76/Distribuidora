import { Request, Response } from 'express';

import contactModelInstance from '../models/contact.model';
import language from '../languages/language.loader';

class ContactController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const contact = await contactModelInstance.register(req.body);
      res.status(201).json({ message: language.contact.register_success, contact: contact });
    } catch (error) {
      res.status(500).json({ error: `${language.contact.register_error}: ${error}` });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await contactModelInstance.getAll();
      res.status(202).json({ contacts });
    } catch (error) {
      res.status(500).json({ error: `${language.contact.contact_not_found}: ${error}` });
    }
  }

  public async getByPartialMatch(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await contactModelInstance.getByPartialMatch(String(req.params.partialMatch));
      res.status(202).json({ contacts });
    } catch (error) {
      res.status(500).json({ error: `${language.contact.contact_not_found}: ${error}` });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const contact = await contactModelInstance.getById(req.params.id);
      if (!contact) {
        res.status(404).json({ error: language.contact.contact_not_found });
      } else {
        res.status(200).json({ contact });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.contact.contact_not_found}: ${error}` });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedContact = await contactModelInstance.update(req.params.contact_id, req.body);
      if (!updatedContact) {
        res.status(404).json({ error: language.contact.contact_not_found });
      } else {
        res.status(202).json({ updatedContact });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.contact.update_error}: ${error}` });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedContact = await contactModelInstance.delete(req.params.contact_id);
      if (!deletedContact) {
        res.status(404).json({ error: language.contact.contact_not_found });
      } else {
        res.status(202).json({ deletedContact });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.contact.delete_error}: ${error}` });
    }
  }


}

export default new ContactController();