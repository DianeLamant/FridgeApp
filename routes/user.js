const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
var fridge = require('./fridge');

const { nameValidation, emailValidation, passwordValidation } = require('../validation');


// GET SPECIFIC USER WITHOUT PASSWORD
router.get('/', verify, async (req, res) => {
    try {
        const user = await User.findById(req.user._userId)
        res.json({name: user.name, email: user.email})
    }catch(err) {
        res.json({message: err})
    }
})

// DELETE USER
router.delete('/', verify, async (req, res) => {

    // Check if the user exist
    const user = await User.findOne({_id: req.user._userId});
    if(!user) return res.status(400).send('User doesn\'t exist'); // TODO hey ! ici tu peux faire .Send(`User doesn\'t exist`) avec les ``pour utiliser le appostrophe

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // Delete fridges link to user
    const fridgesDeleted = await fridge.deleteFridges(res, user._id);

    // Delete the user
    try {
        const removedUser = await User.deleteOne({_id: req.user._userId})
        res.json(removedUser)
    }catch(err) {
        res.status(400).json({message: err})
    }
})

// UPDATE USER NAME
router.patch('/name', verify, async (req, res) => {
    // VALIDATE DATA
    const { error } = nameValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const updateUser = await User.updateOne(
            {_id: req.user._userId}, 
            {$set: {
                name: req.body.name, 
            }}
        )
        res.json(updateUser)
    }catch(err) {
        res.status(400).json({message: err})
    }
})

// UPDATE USER EMAIL
router.patch('/email', verify, async (req, res) => {
    // VALIDATE DATA
    const { error } = emailValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    try {
        const updateUser = await User.updateOne(
            {_id: req.user._userId}, 
            {$set: {
                email: req.body.email, 
            }}
        )
        res.json(updateUser)
    }catch(err) {
        res.status(400).json({message: err})
    }
})

// CHECK USER PASSWORD 
router.post('/checkpassword', verify, async (req, res) => {
    const user = await User.findById(req.user._userId);

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    return res.send(true)
})

// UPDATE USER PASSWORD
router.patch('/password', verify, async (req, res) => {
    // VALIDATE DATA
    const { error } = passwordValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const updateUser = await User.updateOne(
            {_id: req.user._userId}, 
            {$set: {
                password: hashedPassword, 
            }}
        )
        res.json(updateUser)
    }catch(err) {
        res.status(400).json({message: err})
    }
})

module.exports = router;