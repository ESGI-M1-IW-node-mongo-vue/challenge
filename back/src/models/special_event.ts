import {model, Schema} from 'mongoose';


export interface ISpecialEvent {
    start_date: Date;
    end_date: Date;
    location: string;
}

const specialEvent = new Schema<ISpecialEvent>({
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    location: {type: String, required: true}
});

export const SpecialEvent = model<ISpecialEvent>('special_events', specialEvent);


