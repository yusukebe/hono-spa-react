import { Hono } from "hono";

const app = new Hono();
const api = app.basePath("/api");

api.get("/hello", (c) =>
  c.json({
    message: "Hello, World!",
  })
);

export default app;
