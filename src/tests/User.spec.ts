import mongoose from 'mongoose';
import { createUser, loginUser, getUserById, deleteUser } from '../services/user.service';
import { User, UserDocument } from '../models/user.model';
import { hashPassword, comparePassword } from '../services/auth.service';

describe('User Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
      const user = await createUser(userData);
      expect(user).toBeDefined();
      expect(user._id).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password);
    });
  });

  describe('loginUser', () => {
    it('should return null for a non-existent user', async () => {
      const user = await loginUser('johndoe@example.com', 'password123');
      expect(user).toBeNull();
    });

    it('should return null for an incorrect password', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
      await createUser(userData);
      const user = await loginUser('johndoe@example.com', 'incorrectpassword');
      expect(user).toBeNull();
    });

    it('should return the user for a successful login', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
      await createUser(userData);
      const user = await loginUser('johndoe@example.com', 'password123');
      expect(user).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
    });
  });

  describe('getUserById', () => {
    it('should return null for a non-existent user', async () => {
      const user = await getUserById('fakeUserId');
      expect(user).toBeNull();
    });

    it('should return the user for an existing user ID', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
      const createdUser = await createUser(userData);
      const user = await getUserById(createdUser._id);
      expect(user).toBeDefined();
      expect(user?.name).toBe(userData.name);
      expect(user?.email).toBe(userData.email);
    });
  });

  describe('deleteUser', () => {
    it('should return false for a non-existent user ID', async () => {
      const result = await deleteUser('fakeUserId');
      expect(result).toBe(false);
    });

    it('should return true for a successful deletion', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
      const createdUser = await createUser(userData);
      const result = await deleteUser(createdUser._id);
      expect(result).toBe(true);
    });
  });
});
