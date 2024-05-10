import express from 'express';
import ItemController from '../controllers/item.controller';
import passport from '../middlewares/auth.mid';

const itemRouter = express.Router();

itemRouter
  .post(
    '/register',
    passport.authenticate('userJWT', { session: false }),
    ItemController.register
  )

  .get(
    '/getall',
    passport.authenticate('userJWT', { session: false }),
    ItemController.getAll
  )

  .get(
    '/getbypartialmatch/:partialMatch',
    passport.authenticate('userJWT', { session: false }),
    ItemController.getByDescription
  )

  .get(
    '/getbyid/:item_id',
    passport.authenticate('userJWT', { session: false }),
    ItemController.getById
  )

  .put(
    '/getdescriptions',
    passport.authenticate('userJWT', { session: false }),
    ItemController.getDescriptions
  )

  .put(
    '/update/:item_id',
    passport.authenticate('userJWT', { session: false }),
    ItemController.update
  )

  .delete(
    '/delete/:item_id',
    passport.authenticate('adminJWT', { session: false }),
    ItemController.delete
  )


export default itemRouter