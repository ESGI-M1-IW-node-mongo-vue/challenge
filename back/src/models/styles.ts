import {model, Schema} from 'mongoose';


export interface IStyle {
    name: string;
}

const styleSchema = new Schema<IStyle>({
    name: {type: String, required: true, lowercase: true, trim: true},
});


const Style = model<IStyle>('styles', styleSchema);

export {Style}