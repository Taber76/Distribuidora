import express from 'express';
import ItemController from '../controllers/item.controller';
import passport from '../middlewares/auth.mid';

const itemRouter = express.Router();

itemRouter.post(
  '/register',
  passport.authenticate('userJWT', { session: false }),
  ItemController.register
)

itemRouter.get(
  '/getall',
  passport.authenticate('userJWT', { session: false }),
  ItemController.getAll
)

itemRouter.get(
  '/getbypartialmatch/:partialMatch',
  passport.authenticate('userJWT', { session: false }),
  ItemController.getByDescription
)

itemRouter.get(
  '/getbyid/:item_id',
  passport.authenticate('userJWT', { session: false }),
  ItemController.getById
)

itemRouter.put(
  '/getdescriptions',
  passport.authenticate('userJWT', { session: false }),
  ItemController.getDescriptions
)

itemRouter.put(
  '/update/:item_id',
  passport.authenticate('userJWT', { session: false }),
  ItemController.update
)

itemRouter.delete(
  '/delete/:item_id',
  passport.authenticate('adminJWT', { session: false }),
  ItemController.delete
)


export default itemRouter