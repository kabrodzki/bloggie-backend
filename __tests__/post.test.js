const mongoose = require("mongoose");
const postModel = require("../src/models/post.model");
const supertest = require("supertest");
const app = require("../src/app");

const request = supertest(app);

let testPost = {
  title: "Test post",
  tags: ["Tag1", "Tag2"],
  author: "Tester",
  body: "Lorem ipsum",
  creationDate: new Date(Date.now()).toISOString(),
}

beforeAll(async () => {
  await mongoose.connect(process.env.TESTDB);
  testPost = await postModel.create(testPost);
});

afterAll(async () => {
  await mongoose.connection.collection("posts").drop();
  await mongoose.connection.close();
});

describe("GET /api/post", () => {
  it("should return all posts", async () => {
    const res = await request.get("/api/post");

    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/post/:id", () => {
  it("should return post with specified id", async () => {
    const id = testPost.id;
    const res = await request.get(`/api/post/${id}`);

    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });
  it("should return error when post with specified id doesn't exist", async () => {
    const bad_id = "not an id";
    const res = await request.get(`/api/post/${bad_id}`);

    expect(res.status).toBe(500);
  });
});

describe("POST /api/post", () => {
  it("should create new post", async () => {
    const newTestPost = {
      title: "New test post",
      author: "Tester",
      body: "Lorem ipsum",
      tags: ["Lorem", "Ipsum"],
      creationDate: new Date(Date.now()).toISOString(),
    }
    const res = await request
      .post("/api/post/")
      .send(newTestPost)
      .set("Accept", "application/json");
    
    expect(res.status).toBe(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toMatchObject(newTestPost);
  });
  it("should return error when body is missing", async () => {
    const res = await request.post("/api/post ").send({});
    expect(res.status).toBe(500);
  });
});

describe("PUT /api/post/:id", () => {
  it("should update post with specified id", async () => {
    const id = testPost.id;
    const updatedPost = {tags: ["Lorem", "Ipsum", "Dolor"]};
    const res = await request
      .put(`/api/post/${id}`)
      .send(updatedPost);

    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toMatchObject(updatedPost);
  });
});

describe("DELETE /api/post/:id", () => {
  it("should delete post with specified id", async () => {
    const id = testPost.id;
    const res = await request.delete(`/api/post/${id}`);

    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });
});
