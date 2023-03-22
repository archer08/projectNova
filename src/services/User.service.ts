import { User } from "../models/User.model";
import { hashPassword } from "./Auth.service";
import { LoggerService } from "./config.service";

export const createUser = async (userData: any): Promise<any> => {
  const logger = new LoggerService();

  // Hash the password before storing it
  const hashedPassword = await hashPassword(userData.password);

  // Create the new user object
  const user = new User({
    username: userData.username,
    age: userData.age,
    role: userData.role,
    email: userData.email,
    password: hashedPassword,
    address: userData.address,
    phoneNumber: userData.phoneNumber,
    accountStatus: userData.accountStatus,
    isOnline: userData.isOnline,
  });

  // Save the user to the database
  await user.save();

  // Log the creation event with the user data
  logger.log("User created", { user });

  // Return the user object without the password field
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

interface GetUserQuery {
  id?: string;
  [key: string]: any;
}

export async function getUsers(query: GetUserQuery): Promise<any> {
  const loggerService = new LoggerService();
  try {
    loggerService.log(`Getting users with query: ${JSON.stringify(query)}`);
    const users = await User.find(query).select("-password");
    users.forEach((user) => {
      loggerService.log(
        `Found user with id ${user._id}: ${JSON.stringify(user)}`
      );
    });
    return users;
  } catch (error) {
    loggerService.error(
      `Error getting users with query ${JSON.stringify(query)}: ${error}`
    );
    throw error;
  }
}
