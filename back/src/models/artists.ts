import { model, Schema } from "mongoose";
import { IStyle } from "./styles";
import {IFlash} from "./flashs";

export interface IArtist {
  name: string;
  email: string;
  tel?: string;
  profile_img: string;
  google_id: string;
  lastname?: string;
  description?: string;
  address?: string;
  styles?: IStyle[];
  flashs?: IFlash[];
}

export const artistSchema = new Schema<IArtist>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  tel: { type: String, lowercase: true, trim: true },
  profile_img: { type: String, required: true },
  google_id: { type: String, required: true },
  lastname: { type: String, lowercase: true, trim: true },
  description: { type: String },
  address: { type: String },
  styles: [{ type: Schema.Types.ObjectId, ref: "styles" }],
  flashs: [{ type: Schema.Types.ObjectId, ref: "flashs" }],
});

export const Artist = model<IArtist>("artists", artistSchema);
