/**
 * Required External Modules
 */
import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';

// routes
import userRoute from './api/user/user.route';
import authRoute from './api/auth/auth.route';

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || 3009;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */
console.log(process.env.NODE_ENV);
app.get('/', (req: Request, res: Response) => {
    const a = req;
    res.send({ message: 'Hello i am ready' });
});

app.use('/api', userRoute);
app.use('/api', authRoute);
