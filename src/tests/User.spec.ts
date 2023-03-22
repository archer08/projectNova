import { connect, disconnect } from "mongoose";
import { createUser, getUsers } from "../services/User.service";
import { User } from "../models/User.model";
import { hashPassword } from "../services/Auth.service";
import dotenv from "dotenv";
dotenv.config();

describe("createUser", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    await connect(
      "mongodb+srv://projectnova:projectnova@cluster0.ct48x88.mongodb.net/?retryWrites=true&w=majority",
      {}
    );
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should create a new user and return the user object without the password field", async () => {
    const userData = {
      username: "johndoe",
      age: 30,
      role: "user",
      email: "johndoe@example.com",
      password: "password123",
      address: [
        {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          country: "USA",
          postalCode: "12345",
        },
      ],
      phoneNumber: "+19143846407",
      accountStatus: "active",
      isOnline: false,
    };

    const user = await createUser(userData);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined(); // checking user id
    expect(user.username).toBe(userData.username);
    expect(user.age).toBe(userData.age);
    expect(user.role).toBe(userData.role);
    expect(user.email).toBe(userData.email);
    expect(user.address).toHaveLength(1);
    expect(user.address[0]._id).toBeDefined(); // checking address id
    expect(user.address[0].street).toBe(userData.address[0].street);
    expect(user.address[0].city).toBe(userData.address[0].city);
    expect(user.address[0].state).toBe(userData.address[0].state);
    expect(user.address[0].country).toBe(userData.address[0].country);
    expect(user.address[0].postalCode).toBe(userData.address[0].postalCode);
    expect(user.phoneNumber).toBe(userData.phoneNumber);
    expect(user.accountStatus).toBe(userData.accountStatus);
    expect(user.isOnline).toBe(userData.isOnline);
  }, 10000);
  it("should return all users", async () => {
    const userstocreate = [
      {
        username: "testuser1",
        age: 20,
        role: "user",
        email: "testuser1@example.com",
        password: await hashPassword("password123"),
        address: [
          {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            country: "USA",
            postalCode: "12345",
          },
        ],
        phoneNumber: "1234567890",
        accountStatus: "active",
        isOnline: false,
      },
      {
        username: "testuser2",
        age: 25,
        role: "admin",
        email: "testuser2@example.com",
        password: await hashPassword("password456"),
        address: [
          {
            street: "456 Elm St",
            city: "Sometown",
            state: "CA",
            country: "USA",
            postalCode: "54321",
          },
        ],
        phoneNumber: "9876543210",
        accountStatus: "inactive",
        isOnline: true,
      },
    ];
    await User.create(userstocreate[0]);
    await User.create(userstocreate[1]);
    const users = await getUsers({});

    expect(users.length).toBe(2);
    expect(users[0].username).toBe("testuser1");
    expect(users[1].username).toBe("testuser2");
  });

  it("should return a user by id", async () => {
    const userstocreate = [
      {
        username: "testuser1",
        age: 20,
        role: "user",
        email: "testuser1@example.com",
        password: await hashPassword("password123"),
        address: [
          {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            country: "USA",
            postalCode: "12345",
          },
        ],
        phoneNumber: "1234567890",
        accountStatus: "active",
        isOnline: false,
      },
      {
        username: "testuser2",
        age: 25,
        role: "admin",
        email: "testuser2@example.com",
        password: await hashPassword("password456"),
        address: [
          {
            street: "456 Elm St",
            city: "Sometown",
            state: "CA",
            country: "USA",
            postalCode: "54321",
          },
        ],
        phoneNumber: "9876543210",
        accountStatus: "inactive",
        isOnline: true,
      },
    ];
    await User.create(userstocreate[0]);
    await User.create(userstocreate[1]);
    const users = await getUsers({});

    const userId = users[0]._id.toString();

    const foundUser = await getUsers({ _id: userId });

    // expect(foundUser.length).toBe(1);
    expect(foundUser[0].username).toBe("testuser1");
  });

  it("should return a user by email", async () => {
    const userstocreate = [
      {
        username: "testuser1",
        age: 20,
        role: "user",
        email: "testuser1@example.com",
        password: await hashPassword("password123"),
        address: [
          {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            country: "USA",
            postalCode: "12345",
          },
        ],
        phoneNumber: "1234567890",
        accountStatus: "active",
        isOnline: false,
      },
      {
        username: "testuser2",
        age: 25,
        role: "admin",
        email: "testuser2@example.com",
        password: await hashPassword("password456"),
        address: [
          {
            street: "456 Elm St",
            city: "Sometown",
            state: "CA",
            country: "USA",
            postalCode: "54321",
          },
        ],
        phoneNumber: "9876543210",
        accountStatus: "inactive",
        isOnline: true,
      },
    ];
    await User.create(userstocreate[0]);
    await User.create(userstocreate[1]);
    const foundUser = await getUsers({ email: "testuser1@example.com" });

    // expect(foundUser.length).toBe(1);
    expect(foundUser[0].username).toBe("testuser1");
  });

  it("should return a user by username", async () => {
    const userstocreate = [
      {
        username: "testuser1",
        age: 20,
        role: "user",
        email: "testuser1@example.com",
        password: await hashPassword("password123"),
        address: [
          {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            country: "USA",
            postalCode: "12345",
          },
        ],
        phoneNumber: "1234567890",
        accountStatus: "active",
        isOnline: false,
      },
      {
        username: "testuser2",
        age: 25,
        role: "admin",
        email: "testuser2@example.com",
        password: await hashPassword("password456"),
        address: [
          {
            street: "456 Elm St",
            city: "Sometown",
            state: "CA",
            country: "USA",
            postalCode: "54321",
          },
        ],
        phoneNumber: "9876543210",
        accountStatus: "inactive",
        isOnline: true,
      },
    ];
    await User.create(userstocreate[0]);
    await User.create(userstocreate[1]);
    const foundUser = await getUsers({ username: "testuser2" });

    // expect(foundUser.length).toBe(1);
    expect(foundUser[0].username).toBe("testuser2");
  });

  it("should return multiple users by role", async () => {
    const userstocreate = [
      {
        username: "testuser1",
        age: 20,
        role: "user",
        email: "testuser1@example.com",
        password: await hashPassword("password123"),
        address: [
          {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            country: "USA",
            postalCode: "12345",
          },
        ],
        phoneNumber: "1234567890",
        accountStatus: "active",
        isOnline: false,
      },
      {
        username: "testuser2",
        age: 25,
        role: "admin",
        email: "testuser2@example.com",
        password: await hashPassword("password456"),
        address: [
          {
            street: "456 Elm St",
            city: "Sometown",
            state: "CA",
            country: "USA",
            postalCode: "54321",
          },
        ],
        phoneNumber: "9876543210",
        accountStatus: "inactive",
        isOnline: true,
      },
    ];
    await User.create(userstocreate[0]);
    await User.create(userstocreate[1]);
    const foundUsers = await getUsers({ role: "user" });

    // expect(foundUsers.length).toBe(1);
    expect(foundUsers[0].username).toBe("testuser1");

    const foundAdmins = await getUsers({ role: "admin" });

    // expect(foundAdmins.length).toBe(1);
    expect(foundAdmins[0].username).toBe("testuser2");
  });
});
