const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose')



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    }
})

userSchema.plugin(passportLocalMongoose);
userSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema);
module.exports = User;