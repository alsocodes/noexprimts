import { body } from 'express-validator';

const userValidator = (method: string) => {
    switch (method) {
        case 'auth': {
            return [
                body('email')
                    .exists()
                    .withMessage('Email is required')
                    .isEmail()
                    .withMessage('Email format invalid'),
                body('password').exists().withMessage('Password is required'),
            ];
        }
        default:
            return [];
    }
};

export default userValidator;
