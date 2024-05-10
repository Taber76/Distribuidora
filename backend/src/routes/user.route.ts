import express from 'express';
import UserController from '../controllers/user.controller';
import passport from '../middlewares/auth.mid';

const userRouter = express.Router();

userRouter
  .post(
    '/register',
    UserController.register
  )

  .post(
    '/login',
    UserController.login
  )

  .get(
    '/getbyid/:user_id',
    passport.authenticate('userJWT', { session: false }),
    UserController.getById
  )

  .get(
    '/getall',
    passport.authenticate('adminJWT', { session: false }),
    UserController.getAll
  )

  .get(
    '/getbytoken',
    passport.authenticate('userJWT', { session: false }),
    UserController.getByToken
  )

  .put(
    '/update',
    passport.authenticate('userJWT', { session: false }),
    UserController.update
  )

  .put(
    '/updatepassword',
    passport.authenticate('userJWT', { session: false }),
    UserController.updatePassword
  )

  .delete(
    '/delete/:user_id',
    passport.authenticate('userJWT', { session: false }),
    UserController.delete
  )

export default userRouter