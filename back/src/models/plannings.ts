import {model, Schema} from 'mongoose';

type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface IPlanning {
    weekdays: Array<Record<Weekday, {
        start_hour: string,
        end_hour: string
    }>>;
}


const planningSchema = new Schema<IPlanning>({
    weekdays: [{
        monday: {
            start_hour: {type: String, required: true},
            end_hour: {type: String, required: true}
        },
        tuesday: {
            start_hour: {type: String, required: true},
            end_hour: {type: String, required: true}
        },
        wednesday: {
            start_hour: {type: String, required: true},
            end_hour: {type: String, required: true}
        },
        thursday: {
            start_hour: {type: String, required: true},
            end_hour: {type: String, required: true}
        },
        friday: {
            start_hour: {type: String, required: true},
            end_hour: {type: String, required: true}
        },
        saturday: {
            start_hour: {type: String, required: true},
            end_hour: {type: String, required: true}
        },
        sunday: {
            start_hour: {type: String, required: true},
            end_hour: {type: String, required: true}
        }
    }]
});

export const Plannings = model<IPlanning>('plannings', planningSchema);


