import { Hono } from "hono";
import { Artist } from "../models/artists";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath("/artists");

api.get("/", async (c) => {
    const styleQuery = c.req.query("style");
    const googleId = c.req.query("googleId");
  if (!styleQuery && !googleId) {
    return c.json(await Artist.find());
  }

  if(styleQuery){
      const artists = await Artist.find({
          styles: { $in: styleQuery + "" },
      }).populate("styles");
      return c.json(artists);
  }

  if(googleId){
      const oneArt = await Artist.find({
          google_id: googleId
      });
      return c.json(oneArt);
  }

return c.json({ msg: "ObjectId malformed" }, 400);
});

api.get("/:id", async (c) => {
  const _id = c.req.param("id");

  if (isValidObjectId(_id)) {
    const oneArt = await Artist.findOne({ _id });
    return c.json(oneArt);
  }
  return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const newArt = new Artist(body);
    const saveArt = await newArt.save();
    return c.json(saveArt, 201);
  } catch (error: any) {
    return c.json(error._message, 400);
  }
});

api.put("/:id", async (c) => {
  const _id = c.req.param("id");
  const body = await c.req.json();
  const q = {
    _id,
  };
  const updateQuery = {
    ...body,
  };
  const tryToUpdate = await Artist.findOneAndUpdate(q, updateQuery, {
    new: true,
  });
  return c.json(tryToUpdate, 200);
});

api.patch("/:id", async (c) => {
  const _id = c.req.param("id");
  const body = await c.req.json();
  const q = {
    _id,
  };
  const { categories, ...rest } = body;

  const updateQuery = {
    $addToSet: {
      categories: categories,
    },
    $set: { ...rest },
  };
  const tryToUpdate = await Artist.findOneAndUpdate(q, updateQuery, {
    new: true,
  });
  return c.json(tryToUpdate, 200);
});

api.delete("/:id", async (c) => {
  const _id = c.req.param("id");
  const tryToDelete = await Artist.deleteOne({ _id });
  const { deletedCount } = tryToDelete;
  if (deletedCount) {
    return c.json({ msg: "DELETE done" });
  }
  return c.json({ msg: "not found" }, 404);
});

export default api;
