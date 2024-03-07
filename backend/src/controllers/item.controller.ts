import { Request, Response } from 'express';

import itemModelInstance from '../models/item.model';
import language from '../languages/language.loader';

class ItemController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      req.body.description = String(req.body.description).toUpperCase();
      const item = await itemModelInstance.register(req.body);
      res.status(201).json({ item });
    }
    catch (error) {
      res.status(500).json({ error: `${language.item.register_error}: ${error}` });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await itemModelInstance.getAll();
      res.status(202).json({ items });
    } catch (error) {
      res.status(500).json({ error: `${language.item.item_not_found}: ${error}` });
    }
  }

  public async getByDescription(req: Request, res: Response): Promise<void> {
    try {
      const items = await itemModelInstance.getByDescription(String(req.params.partialMatch));
      res.status(202).json({ items });
    } catch (error) {
      res.status(500).json({ error: `${language.item.item_not_found}: ${error}` });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const item = await itemModelInstance.getById(req.params.item_id);
      if (!item) {
        res.status(404).json({ error: language.item.item_not_found });
      } else {
        res.status(202).json({ item });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.item.item_not_found}: ${error}` });
    }
  }

  public async getDescriptions(req: Request, res: Response): Promise<void> {
    try {
      const descriptions = await itemModelInstance.getDescriptions(req.body.arrayOfIds);
      res.status(202).json({ descriptions });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: `${language.item.item_not_found}: ${error}` });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      req.body.description = String(req.body.description).toUpperCase();
      const item = await itemModelInstance.update(req.params.item_id, req.body);
      if (!item) {
        res.status(404).json({ error: language.item.item_not_found });
      } else {
        res.status(202).json({ item });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.item.update_error}: ${error}` });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedItem = await itemModelInstance.delete(req.params.item_id);
      if (!deletedItem) {
        res.status(404).json({ error: language.item.item_not_found });
      } else {
        res.status(202).json({ deletedItem });
      }
    } catch (error) {
      res.status(500).json({ error: `${language.item.delete_error}: ${error}` });
    }
  }


}


export default new ItemController()