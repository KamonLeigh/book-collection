const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: Array,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    notes: {
        type: String,
        required: false,
    }


})


const Store = mongoose.model('Store', storeSchema);

module.exports = Store;