import { Router } from 'express';
import UserController from './user.controller';
import userValidator from './user.validator';
// import validator from '../../middlewares/validator';
// import { authAccessToken } from '../../middlewares/authorization';

const userRoute = Router();
const controller = new UserController();

userRoute.get('/user', controller.getUser);
userRoute.post('/user', controller.postUser);
// userRoute.post('/user', userValidator('createUser'), validator, controller.postUser);
// userRoute.put('/user/:publicId', userValidator('updateUser'), validator, controller.putUser);
// userRoute.delete('/user/:publicId', userValidator('deleteUser'), validator, controller.deleteUser);

export default userRoute;
