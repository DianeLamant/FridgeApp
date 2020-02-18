const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation');

// REGISTER 
router.post('/register', async (req, res) => {
    // VALIDATE DATA
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(208).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(200).send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    // VALIDATE DATA
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if the email exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send('Email is not found');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(409).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({_userId: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

})

module.exports = router;