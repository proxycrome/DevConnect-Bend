import mongoose from 'mongoose';

const {Schema, model, SchemaTypes} = mongoose;


const jobSchema = new Schema({
    job_title: {
        type: String,
        required: true
    },
    job_type: {
        type: String,
        required: true
    },
    job_desc: {
        type: String,
        required: true
    },
    closing_date: {
        type: Date,
    },
    salary: {
        type: Number
    }
}, 
{timestamps: true}
);

export const Job = model('job', jobSchema);