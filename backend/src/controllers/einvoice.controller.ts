import { Request, Response } from 'express';

class EInvoiceController {

  static async register(req: Request, res: Response): Promise<void> {
    try {
      res.status(201).json({ invoice_number: Math.floor(Math.random() * 9000000) + 1000000 });
    } catch (error) {
      res.status(500).json({ error: `Electronic invoice register error: ${error}` });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const invoices: any = [];
      res.status(202).json(invoices);
    } catch (error) {
      res.status(500).json({ error: `Electronic invoice get all error: ${error}` });
    }
  }

}

export default EInvoiceController