import { body, CustomValidator, param } from 'express-validator';
import UserService from './user.service';

const emailInUse: CustomValidator = async (value) => {
    const service = new UserService();
    const user = await service.findByEmail(value);
    if (user) return Promise.reject('Email already in use');
    else return true;
};

const userValidator = (method: string) => {
    switch (method) {
        case 'createUser': {
            return [
                body('name')
                    .exists()
                    .withMessage('Name is required')
                    .isLength({ max: 100 })
                    .withMessage('Name too long'),
                body('email')
                    .exists()
                    .withMessage('Email is required')
                    .isEmail()
                    .withMessage('Invalid email format')
                    .custom(emailInUse),
                body('password')
                    .isLength({ min: 6 })
                    .withMessage('Password minimum 6 charactes')
                    .matches(
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                    )
                    .withMessage(
                        'Must contain number 0-9, capitalize a-z A-Z, and symbol !@#$%^&*'
                    ),
            ];
        }
        case 'updateUser': {
            return [
                body('name')
                    .exists()
                    .withMessage('Name is required')
                    .isLength({ max: 100 })
                    .withMessage('Name too long'),
                body('email')
                    .exists()
                    .withMessage('Email is required')
                    .isEmail()
                    .withMessage('Invalid email format'),
                param('publicId')
                    .exists()
                    .withMessage('user pulicId is required'),
            ];
        }
        case 'deleteUser': {
            return [
                param('publicId')
                    .exists()
                    .withMessage('user pulicId is required'),
            ];
        }
        default:
            return [];
    }
};

export default userValidator;
