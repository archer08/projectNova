import express from 'express';
import { login, logout } from '../controllers/Auth.controller';


const router = express.Router();

router.post('/login',login )
router.post('/register', logout)
export default router