import { model, Schema } from "mongoose";
import { IStyle } from "./styles";
import {IArtist} from "./artists";

export interface IFlash {
  name: string;
  description: string;
  img: string;
  is_booked: boolean;
  price: number;
  style: IStyle;
}

const flashSchema = new Schema<IFlash>({
  name: { type: String, required: true, lowercase: true, trim: true },
  description: { type: String, required: true, lowercase: true, trim: true },
  img: { type: String, required: true },
  is_booked: { type: Boolean, required: true },
  price: { type: Number, required: true },
  style: { type: Schema.Types.ObjectId, ref: "styles" }
});

export const Flash = model<IFlash>("flashs", flashSchema);
