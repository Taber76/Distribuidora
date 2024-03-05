import express from 'express';
import orderController from '../controllers/order.controller';
import passport from '../middlewares/auth.mid';

const orderRouter = express.Router();

orderRouter.post(
  '/register',
  passport.authenticate('userJWT', { session: false }),
  orderController.register
)

orderRouter.get(
  '/getAll',
  passport.authenticate('userJWT', { session: false }),
  orderController.getAll
)

orderRouter.get(
  '/getByField/:field/:value',
  passport.authenticate('userJWT', { session: false }),
  orderController.getByField
)

orderRouter.put(
  '/update/:order_id',
  passport.authenticate('userJWT', { session: false }),
  orderController.update
)

orderRouter.delete(
  '/delete/:order_id',
  passport.authenticate('userJWT', { session: false }),
  orderController.delete
)


export default orderRouter