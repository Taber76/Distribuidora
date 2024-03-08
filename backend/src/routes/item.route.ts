import express from 'express';
import itemController from '../controllers/item.controller';
import passport from '../middlewares/auth.mid';

const itemRouter = express.Router();

itemRouter.post(
  '/item/register',
  passport.authenticate('userJWT', { session: false }),
  itemController.register
)

itemRouter.get(
  '/item/getall',
  passport.authenticate('userJWT', { session: false }),
  itemController.getAll
)

itemRouter.get(
  '/item/getbypartialmatch/:partialMatch',
  passport.authenticate('userJWT', { session: false }),
  itemController.getByDescription
)

itemRouter.get(
  '/item/getbyid/:item_id',
  passport.authenticate('userJWT', { session: false }),
  itemController.getById
)

itemRouter.put(
  '/item/getdescriptions',
  passport.authenticate('userJWT', { session: false }),
  itemController.getDescriptions
)

itemRouter.put(
  '/item/update/:item_id',
  passport.authenticate('userJWT', { session: false }),
  itemController.update
)

itemRouter.delete(
  '/item/delete/:item_id',
  passport.authenticate('adminJWT', { session: false }),
  itemController.delete
)


export default itemRouter