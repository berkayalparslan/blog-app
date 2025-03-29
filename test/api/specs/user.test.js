const app = require("../../../app");
const request = require("supertest");

function generateUniqueUserData() {
  return {
    name: "Admin Adminoglu" + Date.now(),
    email: `admin${Date.now()}@example.com`,
  };
}

describe("/users ENDPOINT", () => {
  describe("POST method", () => {
    it("should create a new user", async () => {
      const newUserData = generateUniqueUserData();
      const response = await request(app).post("/users").send(newUserData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id"); // Check if the response has an 'id' property
      expect(response.body).toHaveProperty("name", newUserData.name);
      expect(response.body).toHaveProperty("email", newUserData.email);
    });
    it("should return 400 if email already exists", async () => {
      const userData = generateUniqueUserData();
      await request(app).post("/users").send(userData);

      const response = await request(app).post("/users").send(userData);
      expect(response.status).toBe(400);
    });
  });

  it("GET method should retrieve all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("GET method should retrieve a specific user", async () => {
    const userData = generateUniqueUserData();
    const newUser = await request(app).post("/users").send(userData);
    const response = await request(app).get(`/users/${newUser.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", newUser.body._id);
    expect(response.body).toHaveProperty("name", userData.name);
    expect(response.body).toHaveProperty("email", userData.email);
  });
  it("/email PUT method should update a specific user email", async () => {
    const userData = generateUniqueUserData();
    const newUser = await request(app)
      .post("/users")
      .send(generateUniqueUserData());
    const response = await request(app)
      .put(`/users/${newUser.body._id}/email`)
      .send({ email: "updated@example.com" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", newUser.body._id);
    expect(response.body).toHaveProperty("email", "updated@example.com");
  });
  it("DELETE method should delete a specific user", async () => {
    const userData = generateUniqueUserData();
    const newUser = await request(app).post("/users").send(userData);
    const newUserId = (await newUser.body)._id;
    const response = await request(app).delete(`/users/${newUserId}`);
    expect(response.status).toBe(204);
  });
});
