import { Hono } from "hono";
import { Reservation } from "../models/reservations";

const api = new Hono().basePath("/reservations");

api.get("/", async (c) => {
  const dateQuery = c.req.query("date");
  if (!dateQuery) {
    return c.json(await Reservation.find());
  }
  const dateFilter = new Date(dateQuery).setHours(0, 0, 0, 0);
  const reservations = await Reservation.find({
    start_date: {
      $gte: dateFilter,
      $lt: new Date(dateFilter).setDate(new Date(dateFilter).getDate() + 1),
    },
  });
  return c.json(reservations);
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

api.delete("/:id", async (c) => {
  const _id = c.req.param("id");
  const tryToDelete = await Reservation.deleteOne({ _id });
  const { deletedCount } = tryToDelete;
  if (deletedCount) {
    return c.json({ msg: "DELETE done" });
  }
  return c.json({ msg: "not found" }, 404);
});

export default api;
