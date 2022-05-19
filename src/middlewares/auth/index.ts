import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import { getCookie } from '../../utils/helper';
import HttpResponse from '../../utils/response';

const authAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const response = new HttpResponse();
    if (!req.headers.authorization) {
        return response.forbidden(res, 401, 'Headers authorization is empty');
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.accessSecret, (err: any, user) => {
        if (err) {
            console.log(err);
            return response.unauthorized(res, 401, err.message);
        } else {
            req.currentUser = user;
            next();
        }
    });
};

const authRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const response = new HttpResponse();
    const refreshToken = getCookie(req.headers.cookie, 'refreshToken');
    if (!refreshToken)
        return response.unauthorized(res, 401, `RefreshToken is required`);

    jwt.verify(refreshToken, config.refreshSecret, (err, user) => {
        if (err) {
            return response.unauthorized(
                res,
                401,
                err.message || 'Unauthorized'
            );
        } else {
            req.currentUser = user;
            next();
        }
    });
};

export { authAccessToken, authRefreshToken };
