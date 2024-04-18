const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    },
    type: { 
        type: String,
        required: true,
        enum: ['customer', 'admin'] 
    },
    favoriteGenres: {
        type: [String], 
        required: false 
    },
    favoriteActors: {
        type: [String],
        required: false
    },
    favoriteDirectors: {
        type: [String],
        required: false
    },
    preferredLanguages: {
        type: [String],
        required: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);
