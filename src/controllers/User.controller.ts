import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { createUser, deleteUser, getUser, updateUser } from '../services/user.service';

interface User {
  password: string;
  _id?: Types.ObjectId;
  username: string;
  email?: string;
  age?: number;
  phoneNumber?: string;
  shoppingCart?: Array<any>;
  role?: string;
  wishlist?: Array<any>;
  address?: Array<any>;
  orders?: Array<any>;
  accountStatus?: string;
  isOnline?: boolean;
}

export const createUserController = async (req: Request, res: Response) => {
  const userData: User = req.body;
  try {
    const createdUser = await createUser(userData);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  const userId: Types.ObjectId = req.params.userId;
  try {
    const user = await getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const userId: Types.ObjectId = req.params.userId;
  const userData: Partial<User> = req.body;
  try {
    const updatedUser = await updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId: Types.ObjectId = req.params.userId;
  try {
    await deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
