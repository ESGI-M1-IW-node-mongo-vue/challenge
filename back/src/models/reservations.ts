import { model, Schema } from "mongoose";
import { IFlash } from "./flashs";
import { IArtist } from "./artists";

interface IReservation {
  start_date: Date;
  end_date: Date;
  name_client: string;
  lastname_client: string;
  email_client: string;
  phone_client: string;
  flash?: IFlash;
  artist: IArtist;
}

const reservationSchema = new Schema<IReservation>({
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  name_client: { type: String, required: true },
  lastname_client: { type: String, required: true },
  email_client: { type: String, required: true },
  phone_client: { type: String, required: true },
  flash: { type: Schema.Types.ObjectId, ref: "flashs" },
  artist: { type: Schema.Types.ObjectId, ref: "artists" },
});

export const Reservation = model<IReservation>(
  "reservations",
  reservationSchema
);
