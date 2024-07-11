import { Hono } from "hono";
import { Flash } from "../models/flashs";
import { SaveOnS3 } from "../aws-s3";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath("/flashs");

api.get("/", async (c) => {
  const artistId = c.req.query("artistId")
  if(!artistId){
    return c.json(await Flash.find());
  }

  const FlashsByArtist = await Flash.find({
    artist: artistId
  })
  return c.json(FlashsByArtist)
});

api.get("/:id", async (c) => {
  const _id = c.req.param("id");

  if (isValidObjectId(_id)) {
    const oneFlash = await Flash.findOne({ _id });
    return c.json(oneFlash);
  }
  return c.json({ msg: "ObjectId malformed" }, 400);
});

api.delete("/:id", async (c) => {
  const _id = c.req.param("id");
  const tryToDelete = await Flash.deleteOne({ _id });
  const { deletedCount } = tryToDelete;
  if (deletedCount) {
    return c.json({ msg: "DELETE done" });
  }
  return c.json({ msg: "not found" }, 404);
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
