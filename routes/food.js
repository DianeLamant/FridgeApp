const express = require('express');
const router = express.Router();
const Fridge = require('../models/Fridge');
const Food = require('../models/Food');
const mongoose = require('mongoose');

// GET BACK ALL THE FOOD FROM FRIDGE
router.get('/:fridgeId', async (req, res) => {
    try {
        const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId)});
        res.json(foods)
    } catch (err) {
        res.json({message: err})
    }
})

// GET BACK FOOD WITH EXPIRY DATE
router.get('/expiryDate/:fridgeId', async (req, res) => {
    try {
        const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId), expiryDate: {$ne: null}});
        res.json(foods)
    } catch (err) {
        res.json({message: err})
    }
})

// GET BACK FOOD WITH OPENING DATE
router.get('/openingDate/:fridgeId', async (req, res) => {
    try {
        const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId), openingDate: {$ne: null}});
        res.json(foods)
    } catch (err) {
        res.json({message: err})
    }
})

// GET BACK FOOD WITH PURCHASE DATE
router.get('/purchaseDate/:fridgeId', async (req, res) => {
    try {
        const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId), purchaseDate: {$ne: null}});
        res.json(foods)
    } catch (err) {
        res.json({message: err})
    }
})

// db.foods.insertOne({ name: "potato", expiryDate: "12/03/20", openingDate: "", type: "vegetable", fridgeId: ObjectId("5e0b7663ac11fe2b7e65c5a4")})

// CREATE FOOD
router.post('/', async (req, res) => {

    const food = new Food({
        name: req.body.name,
        expiryDate: req.body.expiryDate,
        openingDate: req.body.openingDate,
        purchaseDate: req.body.purchaseDate,
        type: req.body.type,
        fridgeId: mongoose.Types.ObjectId(req.body.fridgeId)
    });
    
    const fridge = await Fridge.findById(food.fridgeId);
    if(fridge === null) {
        return res.json({message: "fridgeId is undefined or doesn't exist"})
    }

    try {
        const savedFood = await food.save()
        res.json(savedFood)
    } catch (err) {
        res.json({message: err})
    }

});

// GET SPECIFIC FOOD
router.get('/:foodId', async (req, res) => {
    try {
        const food = await Food.findById(req.params.foodId)
        res.json(food)
    }catch(err) {
        res.json({message: err})
    }
})

// DELETE FOOD
router.delete('/:foodId', async (req, res) => {
    try {
        const removedFood = await Food.deleteOne({_id: req.params.foodId})
        res.json(removedFood)
    }catch(err) {
        res.json({message: err})
    }
})

// UPDATE FOOD
router.patch('/:foodId', async (req, res) => {
    try {
        const updateFood = await Food.updateOne(
            {_id: req.params.foodId}, 
            {$set: {
                name: req.body.name,
                expiryDate: req.body.expiryDate,
                openingDate: req.body.openingDate,
                purchaseDate: req.body.purchaseDate,
                type: req.body.type,
            }}
        )
        res.json(updateFood)
    }catch(err) {
        res.json({message: err})
    }
})

module.exports = router;