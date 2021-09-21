import mongoose from 'mongoose';
import validator from 'validator';

const {Schema, model} = mongoose;
const { isEmail, isURL } = validator;

const employerSchema = new Schema({
    companyName : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a vaild email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    linkedIn: {
        type: String,
        required: [true, 'Please enter your linkedIn profile link'],
        validate: [isURL, "Please enter a valid url"]
    },
    website: {
        type: String,
        required: [true, 'Please enter your website link'],
        validate: [isURL, 'Please enter a valid url']
    },
    access: {
        type: String,
        default: 'employer'
    }
}, 
{timestamps: true}
);

export const Employer = model('employer', employerSchema);