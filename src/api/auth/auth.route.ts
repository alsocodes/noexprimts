import { Router } from 'express';
import authValidator from './auth.validator';
import AuthController from './auth.controller';
import validator from '../../middlewares/validator';
import { authRefreshToken } from '../../middlewares/auth';

const authRoute = Router();
const controller = new AuthController();

authRoute.post('/auth', authValidator('auth'), validator, controller.postAuth);
authRoute.post('/auth/refresh', authRefreshToken, controller.postAuthRefresh);

// authRoute.put('/auth/:publicId', authValidator('updateAuth'), validator, controller.putAuth);
// authRoute.get('/auth', authAccessToken, controller.getAuth);
// authRoute.delete('/auth/:publicId', authValidator('deleteAuth'), validator, controller.deleteAuth);

export default authRoute;
