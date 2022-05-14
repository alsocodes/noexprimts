/**
 * Required External Modules
 */
import express, { Request, Response, Router } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';

// routes
import userRoute from './api/user/user.route';

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

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Hello i am readyx' });
});

app.use('/api', userRoute);
