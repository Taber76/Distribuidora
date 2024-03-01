import express from 'express';
import contactController from '../controllers/contact.controller';
import passport from '../middlewares/auth.mid';

const contactRouter = express.Router();

contactRouter.post(
  '/register',
  passport.authenticate('userJWT', { session: false }),
  contactController.register
)

contactRouter.get(
  '/getall',
  passport.authenticate('userJWT', { session: false }),
  contactController.getAll
)

contactRouter.get(
  '/getbypartialmatch/:partialMatch',
  passport.authenticate('userJWT', { session: false }),
  contactController.getByPartialMatch
)

contactRouter.get(
  '/getById/:contact_id',
  passport.authenticate('userJWT', { session: false }),
  contactController.getById
)

contactRouter.put(
  '/update/:contact_id',
  passport.authenticate('userJWT', { session: false }),
  contactController.update
)

contactRouter.delete(
  '/delete/:contact_id',
  passport.authenticate('userJWT', { session: false }),
  contactController.delete
)


export default contactRouter