import express from 'express';
import { UserRouter } from './classes/user-router';

// Tested using Postman

const app = express();

const userRouter = new UserRouter();
const router = userRouter.getRouter();
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});