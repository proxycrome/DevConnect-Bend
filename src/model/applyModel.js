import mongoose from 'mongoose';
import validator from 'validator';

const {Schema, model} = mongoose;
const { isEmail } = validator;

const devApplySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, 'Please enter a vaild email']
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number']
    },
    city: {
        type: String
    },
    resume: {
        type: Buffer,
        contentType: String
    }
}, 
{timestamps: true}
);

export const DevApply = model('devapply', devApplySchema);