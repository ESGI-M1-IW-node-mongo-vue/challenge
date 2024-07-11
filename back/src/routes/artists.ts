import { Hono } from "hono";
import { Artist } from "../models/artists";
import { isValidObjectId } from "mongoose";
import { decode } from "hono/jwt";

const api = new Hono().basePath("/artists");

api.get("/", async (c) => {
  const filter = {} as any;
  const populate = [];

  const styleQuery = c.req.query("style");
  let googleId = c.req.query("googleId") ?? "";
  const bearer = c.req.header("Authorization");

  if (bearer) {
    const token = bearer.split(" ")[1];
    googleId = decode(token).payload.sub as unknown as string;
    populate.push({ path: "flashs" });
  }

  if (styleQuery) {
    filter["styles"] = { $in: styleQuery + "" };
    populate.push({ path: "styles" });
  }

  if (googleId) {
    filter["google_id"] = googleId;
  }

  return c.json(await Artist.find(filter).populate([...populate]));
});

api.get("/:id", async (c) => {
  const _id = c.req.param("id");

  if (isValidObjectId(_id)) {
    const oneArt = await Artist.findOne({ _id }).populate({ path: "flashs" });
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
