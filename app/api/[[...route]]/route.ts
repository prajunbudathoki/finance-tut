import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import test from "node:test";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({ message: "Hello, World!" });
  })
  .get(
    "/hello/:test",
    zValidator(
      "param",
      z.object({
        test: z.number(),
      })
    ),
    (c) => {
      const test = c.req.param("test");
      return c.json({ message: `Hello, ${test}!` });
    }
  );

export const GET = handle(app);
export const POST = handle(app);

export default app;
