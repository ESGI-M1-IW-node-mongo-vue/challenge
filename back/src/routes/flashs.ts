import { Hono } from "hono";
import { Flash } from "../models/flashs";
import { SaveOnS3 } from "../aws-s3";

const api = new Hono().basePath("/flashs");

api.get("/", async (c) => {
  return c.json(await Flash.find());
});

api.post("/", async (c) => {
  const body = await c.req.parseBody();
  try {
    body.img = await SaveOnS3(body["img"] as File);
    const newFlash = new Flash(body);
    const saveFlash = await newFlash.save();
    return c.json(saveFlash, 201);
  } catch (error: any) {
    return c.json(error._message, 400);
  }
});

export default api;
