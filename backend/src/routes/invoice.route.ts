import express from 'express';
import EinvoiceController from '../controllers/einvoice.controller';
import passport from '../middlewares/auth.mid';

const einvoiceRouter = express.Router();

einvoiceRouter.post(
  '/register',
  //passport.authenticate('adminJWT', { session: false }),
  EinvoiceController.register
)

export default einvoiceRouter