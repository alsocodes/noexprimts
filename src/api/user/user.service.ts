import db from '../../db';
import bcrypt from 'bcrypt';
import prisma from '../../db';

class UserService {
    getUser = async (data: any) => {
        try {
            const { offset, limit, pageSize, search } = data;
            const where = {
                name: {
                    contains: search,
                },
            };
            const { _count } = await prisma.user.aggregate({
                _count: { id: true },
                where: where,
            });

            const users = await prisma.user.findMany({
                select: {
                    publicId: true,
                    name: true,
                    email: true,
                },
                where: where,
                skip: offset || 0,
                take: limit || 10,
            });

            const result = {
                totalCount: _count.id,
                totalPage: Math.ceil(Number(_count.id) / pageSize),
                rows: users,
            };
            return result;
        } catch (error) {
            throw error;
        }
    };

    createUser = async (data: any) => {
        try {
            return await prisma.user.create({
                data: {
                    ...data,
                    password: await bcrypt.hash(data.password, 10),
                },
            });
        } catch (error: any) {
            throw new Error('Some error');
        }
    };

    // updateUser = async (publicId: string, data: any) => {
    //     try {
    //         const { name, email } = data;
    //         await db.User.findOne({
    //             where: { email: email, publicId: { [Op.ne]: publicId } },
    //         }).then((user: any) => {
    //             if (user) {
    //                 const err: any = new Error(
    //                     'Email already in used by another user'
    //                 );
    //                 err.code = 400;
    //                 throw err;
    //             }
    //         });

    //         await db.User.findOne({ where: { publicId: publicId } }).then(
    //             async (user: any) => {
    //                 if (!user) {
    //                     const err: any = new Error('User not found');
    //                     err.code = 400;
    //                     throw err;
    //                 }

    //                 user.name = name;
    //                 user.email = email;
    //                 await user.save();
    //             }
    //         );
    //     } catch (error: any) {
    //         throw error;
    //     }
    // };

    // deleteUser = async (publicId: string) => {
    //     try {
    //         await db.User.findOne({ where: { publicId: publicId } }).then(
    //             async (user: any) => {
    //                 if (!user) {
    //                     const err: any = new Error('User not found');
    //                     err.code = 400;
    //                     throw err;
    //                 }

    //                 await user.destroy();
    //             }
    //         );
    //     } catch (error: any) {
    //         throw error;
    //     }
    // };

    findByEmail = async (data: any) => {
        try {
            return await prisma.user.findUnique({
                select: {
                    email: true,
                },
                where: { email: data },
            });
        } catch (error) {
            throw error;
        }
    };
}

export default UserService;
