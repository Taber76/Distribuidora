import express from 'express';
import itemController from '../controllers/item.controller';
import passport from '../middlewares/auth.mid';

const itemRouter = express.Router();

itemRouter.post(
  '/register',
  passport.authenticate('userJWT', { session: false }),
  itemController.register
)

itemRouter.get(
  '/all/:partialMatch',
  passport.authenticate('userJWT', { session: false }),
  itemController.getAll
)

itemRouter.get(
  '/get/:item_id',
  passport.authenticate('userJWT', { session: false }),
  itemController.getById
)

itemRouter.put(
  '/update/:item_id',
  passport.authenticate('userJWT', { session: false }),
  itemController.update
)

itemRouter.delete(
  '/delete/:item_id',
  passport.authenticate('userJWT', { session: false }),
  itemController.delete
)


export default itemRouter