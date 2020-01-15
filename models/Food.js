const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    openingDate: {
        type: Date,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    fridgeId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Fridge'
    }
})

module.exports = mongoose.model('Food', FoodSchema)