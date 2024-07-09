import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const guard = createMiddleware(async (c, next) => {
  console.log(`AUTH GUARD :: [${c.req.method}] ${c.req.url}`);

  const header = c.req.header("Authorization");
  if (!header) {
    return c.json({ msg: "No token provided" }, 401);
  }

  const token = header.split(" ")[1];

  try {
    await verify(token, "pouetpouetpouet");
  } catch (error: any) {
    return c.json({ msg: "Invalid token" }, 403);
  }

  await next();
});

export { guard };