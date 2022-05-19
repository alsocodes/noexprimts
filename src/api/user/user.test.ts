import { prismaMock } from '../../../singleton';
import UserService from './user.service';
import { User } from '@prisma/client';
const service = new UserService();

describe('This is a simple test', () => {
    test('Check the sampleFunction function', async () => {
        const user: any = {
            name: 'alisho',
            email: 'alisho@gmail.com',
            password: '123456',
            userType: 'adminxxxx',
        };

        prismaMock.user.create.mockResolvedValue(user);
        await expect(service.createUser(user)).resolves.toEqual(user);
        // expect(1).toEqual(1);
    });
});
