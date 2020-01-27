const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verify = require('./verifyToken');
const nodemailer = require('nodemailer');
require('dotenv/config');

const User = require('../models/User');
const Fridge = require('../models/Fridge');
var food = require('./food');

var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
});

// GET BACK ALL THE USER'S FRIDGES 
router.get('/', verify, async (req, res) => {
    try {
        const fridges = await Fridge.find({usersId: mongoose.Types.ObjectId(req.user._userId)});
        res.json(fridges)
    } catch (err) {
        res.status(400).json({message: err})
    }
})

// CREATE FRIDGE
router.post('/', verify, async (req, res) => {
    const fridge = new Fridge({
        name: req.body.name,
        usersId: [mongoose.Types.ObjectId(req.user._userId)]
    });
    try {
        const savedFridge = await fridge.save()
        res.json(savedFridge)
    } catch (err) {
        res.status(400).json({message: err})
    }

});

// GET SPECIFIC FRIDGE
// --- NOT USED
router.get('/:fridgeId', async (req, res) => {
    try {
        const fridge = await Fridge.findById(req.params.fridgeId)
        res.json(fridge)
    }catch(err) {
        res.status(400).json({message: 'Fridge not found'})
    }
})

// DELETE FRIDGE
router.delete('/:fridgeId', verify, async (req, res) => {
    const fridge = await Fridge.findById(req.params.fridgeId);
    // For each user in users fridge
    for(let userId of fridge.usersId) {

        // Check if user is in the fridge
        if(userId == req.user._userId) {
            deleteFridge(res, fridge, req.user._userId);
        }
    }
    
    // res.status(400).json({message: 'userId is not bind to fridgeId'});

})

// UPDATE FRIDGE
router.patch('/:fridgeId', verify, async (req, res) => {
    const fridge = await Fridge.findById(req.params.fridgeId);

    // For each user in users fridge
    for(let userId of fridge.usersId) {
        // Check if user is in the fridge
        if(userId == req.user._userId) {
            try {
                const updateFridge = await Fridge.updateOne(
                    {_id: req.params.fridgeId}, 
                    {$set: {
                        name: req.body.name
                    }}
                )
                res.json(updateFridge)
            }catch(err) {
                res.json({message: err})
            }
        }
    }
    res.status(400).json({message: 'userId is not bind to fridgeId'});
})

// db.fridges.update({ _id: ObjectId("5e0b4a1396bc8425d10814d5") }, { $push: { usersId: ObjectId("5e0b16771c5bb6239daeeced") } })

// ADD USER IN FRIDGE
router.post('/addUser', verify, async (req, res) => {
    const user = await User.findOne({email: req.body.userEmail});
    const fridge = await Fridge.findById(req.body.fridgeId);
    
    if(user === null) {
        const reqUser = await User.findById(req.user._userId);
        const message = {
            from: '"FridgeApp" <diane.lamant.simplon@gmail.com>', // Sender address
            to: req.body.userEmail,         // List of recipients
            subject: `Join Fridge App`, // Subject line
            text: `${reqUser.name} offers you to join her fridge "${fridge.name}" in our app FridgeApp.
            Download FridgeApp on your phone! ` // Plain text body
        };
        
        transport.sendMail(message, function(err, info) {
            if (err) {
              res.json(err)
            } else {
              res.json(info);
            }
        });
    } else {
        // Look if user id is already link to the fridge
        for(let userId of fridge.usersId) {
            if(userId.toString() === user._id.toString()) {
                return res.status(400).json({message: 'User is already in the fridge'})
            } 
        }

        // Update usersId with the new userId
        try {
            const addFridgeUser = await Fridge.updateOne(
                { _id: mongoose.Types.ObjectId(fridge._id) },
                { $push: { usersId: mongoose.Types.ObjectId(user._id) } },
            );
            res.json('ok')
            
        } catch (err) {
            res.status(400).json({message: err})
        }
    }
    


});


const deleteFridges = async (res, userId) =>  {
    const fridges = await Fridge.find({usersId: mongoose.Types.ObjectId(userId)});
    // For each user's fridge
    for(let fridge of fridges) {
        deleteFridge(res, fridge, userId);
    }
    
}

const deleteFridge = async (res, fridge, reqUserId) => {
    // Check if the user is alone in the fridge
    if(fridge.usersId.length === 1) {
        
        // Delete all foods from the fridge
        food.deleteFoods(res, fridge._id);

        // Delete the fridge
        try {
            const removedFridge = await Fridge.deleteOne({_id: fridge._id})
            res.json('ok')
        }catch(err) {
            res.status(400).json({message: err})
        }
    } else {
        // Delete the user from the fridge
        try {
            const updateFridge = await Fridge.updateOne(
                { _id: mongoose.Types.ObjectId(fridge._id) },
                { $pull: { usersId: mongoose.Types.ObjectId(reqUserId) } },
            )
            res.json('ok')
        }catch(err) {
            res.status(400).json({message: err})
        }
    }
}

module.exports = {
    router: router,
    deleteFridges: deleteFridges
};