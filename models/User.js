const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    age:{
        type: Number,
        required: true,
        trim: true,
    },
    gender:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

const User = mongoose.model('User', Schema);

module.exports = User;
