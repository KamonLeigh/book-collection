const mongoose = require('.mongoose');
const validator = require('validator');



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
    name: {
        type: String
    }
})


const User = mongoose.model('User', userSchema);
module.exports = User;