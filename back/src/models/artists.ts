import { model, Schema } from "mongoose";
import { IStyle } from "./styles";

export interface IArtist {
  name: string;
  email: string;
  profile_img: string;
  google_id: string;
  lastname?: string;
  description?: string;
  address?: string;
  styles?: IStyle[];
}

const artistSchema = new Schema<IArtist>({
  name: { type: String, required: true, lowercase: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  profile_img: { type: String, required: true },
  google_id: { type: String, required: true },
  lastname: { type: String, lowercase: true, trim: true },
  description: { type: String },
  address: { type: String },
  styles: [{ type: Schema.Types.ObjectId, ref: "styles" }],
});

export const Artist = model<IArtist>("artists", artistSchema);
