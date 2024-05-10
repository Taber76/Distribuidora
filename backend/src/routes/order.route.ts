import express from 'express';
import OrderController from '../controllers/order.controller';
import passport from '../middlewares/auth.mid';

const orderRouter = express.Router();

orderRouter.post(
  '/register',
  passport.authenticate('userJWT', { session: false }),
  OrderController.register
)

orderRouter.get(
  '/getAll',
  passport.authenticate('userJWT', { session: false }),
  OrderController.getAll
)

orderRouter.get(
  '/getByField/:field/:value',
  passport.authenticate('userJWT', { session: false }),
  OrderController.getByField
)

orderRouter.post(
  '/getFiltered',
  passport.authenticate('userJWT', { session: false }),
  OrderController.getFiltered
)

orderRouter.put(
  '/update/:order_id',
  passport.authenticate('userJWT', { session: false }),
  OrderController.update
)

orderRouter.delete(
  '/delete/:order_id',
  passport.authenticate('adminJWT', { session: false }),
  OrderController.delete
)


export default orderRouter