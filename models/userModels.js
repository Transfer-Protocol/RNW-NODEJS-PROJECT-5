const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')

mongoose.connect('mongodb://localhost:27017/userDB')
    .then(() => console.log('Mongoose connected successfully'))
    .catch(() => console.log('Mongoose connection [FAILED]'));

const userProfilePhoto = 'profiles/photos';

const profilePictureStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, '..', userProfilePhoto));
    },

    filename: (_req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    }
})

const required = true;

// @ts-ignore
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required
    },

    lastName: {
        type: String,
        required
    },

    email: {
        type: String,
        required
    },

    photoURL: {
        type: String,
        required
    },

    role: {
        type: String,
        validate: {
            validator: function(value) {
              // Return false if it is an empty string, true otherwise
              return value.trim().length > 0;
            },
            message: 'role cannot be an empty string.'
        },
        required
    },

    team: {
        type: String,
        validate: {
            validator: function(value) {
              // Return false if it is an empty string, true otherwise
              return value.trim().length > 0;
            },
            message: 'team cannot be an empty string.'
        },
        required
    },

    status: {
        type: String,
        enum: ['Active', 'Pending', 'Suspended'],
        default: 'Active'
    },

    joinedDate: {
        type: Date,
        default: new Date()
    }
})

userSchema.statics.userPhoto = multer({
    storage: profilePictureStorage
}).single('userPhoto');

// @ts-ignore
const user = mongoose.model('user', userSchema);

module.exports = user;