import {IArtist} from "./artists";
import {model, Schema} from "mongoose";


export interface IReview {
    note: number;
    description: string;
    artist: IArtist;
}

const reviewSchema = new Schema<IReview>({
    note: {type: Number, required: true},
    description: {type: String, required: true},
    artist: {type: Schema.Types.ObjectId, ref: 'artists'}
});

export const Review = model<IReview>('reviews', reviewSchema);
