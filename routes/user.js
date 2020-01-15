const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const User = require('../models/User');

// GET USER
router.get('/', verify, async (req, res) => {
    const user = await User.findById(req.user)
    res.send({id: user._id, name: user.name});
})

// CREATE USER
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email, 
        name: req.body.name, 
        password: req.body.password
    });
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        res.json({message: err})
    }
});

// GET SPECIFIC USER WITHOUT PASSWORD
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json({name: user.name, email: user.email})
    }catch(err) {
        res.json({message: err})
    }
})

// DELETE USER
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({_id: req.params.userId})
        res.json(removedUser)
    }catch(err) {
        res.json({message: err})
    }
})

// UPDATE USER
router.patch('/:userId', async (req, res) => {
    try {
        const updateUser = await User.updateOne(
            {_id: req.params.userId}, 
            {$set: {
                email: req.body.email, 
                name: req.body.name, 
                password: req.body.password
            }}
        )
        res.json(updateUser)
    }catch(err) {
        res.json({message: err})
    }
})

module.exports = router;