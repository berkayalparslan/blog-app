const app = require("../../../app");
const request = require("supertest");

describe("/posts ENDPOINT", () => {
  it("POST method should create a new post", async () => {
    const response = await request(app)
      .post("/posts")
      .send({ title: "Test Post", content: "This is a test post" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("title", "Test Post");
    expect(response.body).toHaveProperty("content", "This is a test post");
  });

  it("GET method should retrieve all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET method should retrieve a specific post", async () => {
    const newPost = await request(app)
      .post("/posts")
      .send({ title: "Test Post", content: "This is a test post" });
    const response = await request(app).get(`/posts/${newPost.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", newPost.body._id);
    expect(response.body).toHaveProperty("title", "Test Post");
    expect(response.body).toHaveProperty("content", "This is a test post");
  });

  it("PUT method should update a specific post", async () => {
    const newPost = await request(app)
      .post("/posts")
      .send({ title: "Test Post", content: "This is a test post" });
    const response = await request(app)
      .put(`/posts/${newPost.body._id}`)
      .send({ title: "Updated Post", content: "Updated content" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", newPost.body._id);
    expect(response.body).toHaveProperty("title", "Updated Post");
    expect(response.body).toHaveProperty("content", "Updated content");
  });

  it("DELETE method should delete a specific post", async () => {
    const newPost = await request(app)
      .post("/posts")
      .send({ title: "Test Post", content: "This is a test post" });
    const response = await request(app).delete(`/posts/${newPost.body._id}`);
    expect(response.status).toBe(204);
  });
});
