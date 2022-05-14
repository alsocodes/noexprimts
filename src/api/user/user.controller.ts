import { Request, Response } from 'express';
import HttpResponse from '../../utils/response';
import UserService from './user.service';
class UserController {
    service = new UserService();
    response = new HttpResponse();

    getUser = async (req: Request, res: Response) => {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const pageSize = req.query.pageSize
                ? Number(req.query.pageSize)
                : 20;
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            const search = !req.query.search ? '' : req.query.search;

            const users = await this.service.getUser({
                offset,
                limit,
                pageSize,
                search,
            });
            return this.response.success(res, 200, 'Success', users);
        } catch (error: any) {
            return this.response.serverError(
                res,
                error?.code || 500,
                error?.message || 'Error'
            );
        }
    };

    postUser = async (req: Request, res: Response) => {
        try {
            await this.service.createUser(req.body);
            return this.response.success(res, 201, 'Success', {});
        } catch (error: any) {
            return this.response.serverError(
                res,
                error.code || 500,
                error.message || 'Some error'
            );
        }
    };

    // putUser = async (req: Request, res: Response) => {
    //     try {
    //         await this.service.updateUser(req.params.publicId, req.body);
    //         this.response.success(res, 200, 'Update success', {});
    //     } catch (error: any) {
    //         this.response.serverError(
    //             res,
    //             error?.code || 500,
    //             error?.message || 'Error'
    //         );
    //     }
    // };

    // deleteUser = async (req: Request, res: Response) => {
    //     try {
    //         await this.service.deleteUser(req.params.publicId);
    //         this.response.success(res, 200, 'Delete success', {});
    //     } catch (error: any) {
    //         this.response.serverError(
    //             res,
    //             error?.code || 500,
    //             error?.message || 'Error'
    //         );
    //     }
    // };
}

export default UserController;
