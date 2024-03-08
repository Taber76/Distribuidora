import express from 'express';
import userController from '../controllers/user.controller';
import passport from '../middlewares/auth.mid';

const userRouter = express.Router();

userRouter.post(
  '/register',
  userController.register
)

userRouter.post(
  '/login',
  userController.login
)

userRouter.get(
  '/getbyid/:user_id',
  passport.authenticate('userJWT', { session: false }),
  userController.getById
)

userRouter.get(
  '/getall',
  passport.authenticate('adminJWT', { session: false }),
  userController.getAll
)

userRouter.get(
  '/getbytoken',
  passport.authenticate('userJWT', { session: false }),
  userController.getByToken
)

userRouter.put(
  '/update',
  passport.authenticate('userJWT', { session: false }),
  userController.update
)

userRouter.delete(
  '/delete/:user_id',
  passport.authenticate('userJWT', { session: false }),
  userController.delete
)

export default userRouter