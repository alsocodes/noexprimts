import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Defining soft delete / paranoid middleware
 *
 * - Reading data : Alter findUnique to findFirst, and filter with deletedAt is null.
 * - Updating data : Prevent to edit soft deleted by filter deletedAt is null
 * - Deleting data : Alter method delete to update, and add argument data deletedAt with current datetime
 *
 * alsocodes May 14, 2022
 */

prisma.$use(async (params, next) => {
    if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst';
        if (!params.args.where) params.args['where'] = {};
        params.args.where['deletedAt'] = null;
    }
    if (params.action === 'findMany') {
        console.log('args', params.args);
        if (!params.args) params['args'] = {};
        if (params.args.where) {
            if (params.args.where.deleted === undefined) {
                params.args.where['deletedAt'] = null;
            }
        } else {
            params.args['where'] = { deletedAt: null };
        }
    }
    return next(params);
});

prisma.$use(async (params, next) => {
    if (params.action == 'update') {
        params.action = 'updateMany';
        params.args.where['deletedAt'] = null;
    }
    if (params.action == 'updateMany') {
        if (params.args.where !== undefined) {
            params.args.where['deletedAt'] = null;
        } else {
            params.args['where'] = { deletedAt: null };
        }
    }
    return next(params);
});

prisma.$use(async (params, next) => {
    if (params.action == 'delete') {
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
    }
    if (params.action == 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data !== undefined) {
            params.args.data['deletedAt'] = new Date();
        } else {
            params.args['data'] = { deletedAt: new Date() };
        }
    }
    return next(params);
});

export default prisma;
