const { User } = require("../../schemas/userSchema");
const connection = require("../../utils/connection");
require("dotenv").config();

describe("insert", () => {
  beforeAll(async () => {
    connection();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should get a user", async () => {
    const user = await User.findOne({ mail: "arjunthiru123@gmail.com" });
    expect(user).toHaveProperty("mail", "arjunthiru123@gmail.com");
  });

  it("should get a null", async () => {
    const user = await User.findOne({ mail: "__nomail__@gmail.com" });
    expect(user).toBeNull();
  });
});
