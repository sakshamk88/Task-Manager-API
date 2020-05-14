const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Tarun",
  email: "example1@gmail.com",
  password: "user123@1",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.WEBTOKEN_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});
test("should create a user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Saksham",
      email: "example@gmail.com",
      password: "heysaksham123",
    })
    .expect(201);
  //Assertions abount the database being correctly.
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Saksham",
      email: "example@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("heysaksham123");
});

test("should log in existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);

  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not log in non existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "exampleone@gmail.com",
      password: userOne.password,
    })
    .expect(400);
});

test("should get profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
test("should not get for non authenticated profile", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});
test("should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
