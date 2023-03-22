import { hashPassword, checkPassword } from "../services/Auth.service";

describe("hashPassword", () => {
  it("should return a hashed password", async () => {
    const password = "mypassword";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);
  });
});

describe("checkPassword", () => {
  it("should return true for matching passwords", async () => {
    const password = "mypassword";
    const hashedPassword = await hashPassword(password);
    const isMatch = await checkPassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it("should return false for non-matching passwords", async () => {
    const password = "mypassword";
    const otherPassword = "otherpassword";
    const hashedPassword = await hashPassword(password);
    const isMatch = await checkPassword(otherPassword, hashedPassword);
    expect(isMatch).toBe(false);
  });
});
