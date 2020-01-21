const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Fridge = require('../models/Fridge');
const mongoose = require('mongoose');

// GET BACK ALL THE USER'S FRIDGES 
router.get('/', verify, async (req, res) => {
    try {
        const fridges = await Fridge.find({usersId: mongoose.Types.ObjectId(req.user._userId)});
        res.json(fridges)
    } catch (err) {
        res.json({message: err})
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
        res.json({message: err})
    }

});

// GET SPECIFIC FRIDGE
router.get('/:fridgeId', async (req, res) => {
    try {
        const fridge = await Fridge.findById(req.params.fridgeId)
        res.json(fridge)
    }catch(err) {
        res.json({message: err})
    }
})

// DELETE FRIDGE
router.delete('/:fridgeId', async (req, res) => {
    try {
        const removedFridge = await Fridge.deleteOne({_id: req.params.fridgeId})
        res.json(removedFridge)
    }catch(err) {
        res.json({message: err})
    }
})

// UPDATE FRIDGE
router.patch('/:fridgeId', async (req, res) => {
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
})

// db.fridges.update({ _id: ObjectId("5e0b4a1396bc8425d10814d5") }, { $push: { usersId: ObjectId("5e0b16771c5bb6239daeeced") } })

// ADD USER IN FRIDGE
router.post('/addUser/:fridgeId', async (req, res) => {
    // Look if user id is already link to the fridge
    const fridge = await Fridge.findById(req.params.fridgeId);
    for(let userId of fridge.usersId) {
        if(userId == req.body.userId) {
            return res.json({message: err})
        }
    }
    try {
        // Update usersId with the new userId
        const addFridgeUser = await Fridge.update(
            { _id: mongoose.Types.ObjectId(req.params.fridgeId) },
            { $push: { usersId: mongoose.Types.ObjectId(req.body.userId) } },
        );
        res.json(fridge)
        
    } catch (err) {
        res.json({message: err})
    }

});

module.exports = router;