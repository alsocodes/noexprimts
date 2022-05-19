import { Router } from 'express';
import UserController from './user.controller';
import userValidator from './user.validator';
import validator from '../../middlewares/validator';
import { authAccessToken } from '../../middlewares/auth';

const userRoute = Router();
const controller = new UserController();

userRoute.get('/user', authAccessToken, controller.getUser);
userRoute.post(
    '/user',
    userValidator('createUser'),
    validator,
    authAccessToken,
    controller.postUser
);
userRoute.post(
    '/user/register',
    userValidator('createUser'),
    validator,
    controller.postUser
);
// userRoute.put('/user/:publicId', userValidator('updateUser'), validator, controller.putUser);
// userRoute.delete('/user/:publicId', userValidator('deleteUser'), validator, controller.deleteUser);

export default userRoute;
