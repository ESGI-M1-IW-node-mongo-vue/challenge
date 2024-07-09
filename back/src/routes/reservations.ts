import {Hono} from "hono";
import {Reservation} from "../models/reservations";

const api = new Hono().basePath("/reservations");

api.get("/", async (c) => {
    return c.json(await Reservation.find());
});

api.post("/", async (c) => {
    const body = await c.req.json();
    try {
        const newReservation = new Reservation(body);
        const saveReservation = await newReservation.save();
        return c.json(saveReservation, 201);
    } catch (error: any) {
        return c.json(error._message, 400);
    }
});

export default api