import express from 'express';
import { getUserController, createUserController, updateUserController, deleteUserController } from '../controllers/user.controller';

const router = express.Router();

router.get('/:userId', getUserController);
router.post('/', createUserController);
router.put('/:userId', updateUserController);
router.delete('/:userId', deleteUserController);

export default router;
