import express from 'express';
import einvoiceController from '../controllers/einvoice.controller';
import passport from '../middlewares/auth.mid';

const einvoiceRouter = express.Router();

einvoiceRouter.post(
  '/einvoice/register',
  passport.authenticate('adminJWT', { session: false }),
  einvoiceController.register
)

export default einvoiceRouter