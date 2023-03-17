import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt'
import { uuidv4 } from 'uuid';
import UserRouter from './routes/User.routes';
import AuthRouter from './routes/Auth.routes';
import { requireAuth } from './middlewares/Auth.middleware';

const app = express();
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.use('/api/v1/users',requireAuth, UserRouter);
app.use('/api/v1/auth',AuthRouter);




export default app