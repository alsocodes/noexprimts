import { Request, Response } from 'express';
import HttpResponse from '../../utils/response';
import AuthService from './auth.service';
class AuthController {
    service = new AuthService();
    response = new HttpResponse();

    postAuth = async (req: Request, res: Response) => {
        try {
            const auth = await this.service.createAuth(req.body);
            res.cookie('refreshToken', auth.refreshToken, { httpOnly: false });
            this.response.success(res, 201, 'Success', auth);
        } catch (error: any) {
            this.response.serverError(res, error?.code || 500, error?.message || 'Error');
        }
    };

    postAuthRefresh = async (req: Request, res: Response) => {
        try {
            const authRefresh = await this.service.createAuthRefresh(req.currentUser);
            res.cookie('refreshToken', authRefresh.refreshToken, { httpOnly: false });
            this.response.success(res, 201, 'Success', authRefresh);
        } catch (error: any) {
            this.response.serverError(res, error?.code || 500, error?.message || 'Error');
        }
    };
}

export default AuthController;
