import db from '../../db';
import bcrypt from 'bcrypt';
import { makeError } from '../../utils/helper';
import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import prisma from '../../db';

class UserService {
    createAuth = async (data: any) => {
        try {
            const { email, password } = data;
            const user = await prisma.user.findUnique({
                where: { email: email },
            });
            if (!user) throw makeError(`Email not found`, 401);

            const compare = await bcrypt.compare(password, user.password);
            if (!compare) throw makeError(`Password missmatch`, 401);
            const userData = {
                publicId: user.publicId,
                name: user.name,
                email: user.email,
            };
            const accessToken = jwt.sign(userData, config.accessSecret, {
                expiresIn: config.jwtExp,
            });

            const refreshToken = jwt.sign(userData, config.refreshSecret, {
                expiresIn: config.jwtRefreshExp,
            });

            return {
                userData,
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        } catch (error) {
            throw error;
        }
    };

    createAuthRefresh = async (data: any) => {
        try {
            const userData = {
                publicId: data.publicId,
                name: data.name,
                email: data.email,
            };
            const accessToken = jwt.sign(userData, config.accessSecret, {
                expiresIn: config.jwtExp,
            });

            const refreshToken = jwt.sign(userData, config.refreshSecret, {
                expiresIn: config.jwtRefreshExp,
            });

            return {
                userData,
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        } catch (error) {
            throw error;
        }
    };
}

export default UserService;
