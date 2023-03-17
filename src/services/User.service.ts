import { User, UserDocument } from "../models/user.model";
import { hashPassword, comparePassword } from "../services/auth.service";

export const createUser = async (userData: UserDocument): Promise<UserDocument> => {
  const hashedPassword = await hashPassword(userData.password);
  const user = new User({
    ...userData,
    password: hashedPassword
  });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string): Promise<UserDocument | null> => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return null;
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

export const getUserById = async (id: string): Promise<UserDocument | null> => {
  const user = await User.findById(id);
  return user;
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  const result = await User.deleteOne({ _id: userId });
  return result.deletedCount === 1;
};

