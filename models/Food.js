const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: false
    },
    openingDate: {
        type: Date,
        required: false
    },
    purchaseDate: {
        type: Date,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    fridgeId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Fridge',
        required: true
    }
})

module.exports = mongoose.model('Food', FoodSchema)