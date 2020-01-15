const mongoose = require('mongoose');

const FridgeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    usersId: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Fridge', FridgeSchema)