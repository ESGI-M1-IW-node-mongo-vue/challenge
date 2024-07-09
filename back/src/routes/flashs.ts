import {Hono} from "hono";
import {Flash} from "../models/flashs";

const api = new Hono().basePath("/flashs");

api.get("/", async (c) => {
    return c.json(await Flash.find());
});

api.post("/", async (c) => {
    const body = await c.req.json();
    try {
        const newFlash = new Flash(body);
        const saveFlash = await newFlash.save();
        return c.json(saveFlash, 201);
    } catch (error: any) {
        return c.json(error._message, 400);
    }
});

export default api