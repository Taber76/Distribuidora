import express from 'express';
import UserController from '../controllers/user.controller';
import passport from '../middlewares/auth.mid';

const userRouter = express.Router();

userRouter.post(
  '/register',
  UserController.register
)

userRouter.post(
  '/login',
  UserController.login
)

userRouter.get(
  '/getbyid/:user_id',
  passport.authenticate('userJWT', { session: false }),
  UserController.getById
)

userRouter.get(
  '/getall',
  passport.authenticate('adminJWT', { session: false }),
  UserController.getAll
)

userRouter.get(
  '/getbytoken',
  passport.authenticate('userJWT', { session: false }),
  UserController.getByToken
)

userRouter.put(
  '/update',
  passport.authenticate('userJWT', { session: false }),
  UserController.update
)

userRouter.put(
  '/updatepassword',
  passport.authenticate('userJWT', { session: false }),
  UserController.updatePassword
)

userRouter.delete(
  '/delete/:user_id',
  passport.authenticate('userJWT', { session: false }),
  UserController.delete
)

export default userRouter