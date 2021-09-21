import mongoose from 'mongoose';
import validator from 'validator';

const {Schema, model} = mongoose;
const { isEmail } = validator;

const devSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    github: {
        type: String,
        required: [true, 'Please enter a link to your github account']
    },
    linkedIn: {
        type: String
    },
    role: {
        type: String
    },
    bio: {
        type: String
    },
    gender: {
        type: String,
        required: true
    }
}, 
{timestamps: true}
);

export const Dev = model('dev', devSchema);