import express from 'express';
import ContactController from '../controllers/contact.controller';
import passport from '../middlewares/auth.mid';

const contactRouter = express.Router();

contactRouter
  .post(
    '/register',
    passport.authenticate('userJWT', { session: false }),
    ContactController.register
  )

  .get(
    '/getall',
    passport.authenticate('userJWT', { session: false }),
    ContactController.getAll
  )

  .get(
    '/getbypartialmatch/:partialMatch',
    passport.authenticate('userJWT', { session: false }),
    ContactController.getByPartialMatch
  )

  .get(
    '/getById/:contact_id',
    passport.authenticate('userJWT', { session: false }),
    ContactController.getById
  )

  .put(
    '/update',
    passport.authenticate('userJWT', { session: false }),
    ContactController.update
  )

  .delete(
    '/delete/:contact_id',
    passport.authenticate('adminJWT', { session: false }),
    ContactController.delete
  )


export default contactRouter