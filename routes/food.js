const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Fridge = require('../models/Fridge');
const Food = require('../models/Food');
const mongoose = require('mongoose');

async function isUserInFridge(res, fridgeId, userRequestId) {
    const fridge = await Fridge.findById(fridgeId);
    for(let userId of fridge.usersId) {
        if(userId == userRequestId) {
            return true;
        } 
    }
    return res.status(400).json({message: 'userId is not bind to fridgeId'})
}

// GET BACK ALL THE FOOD FROM FRIDGE 
// --- NOT USED
router.get('/:fridgeId', async (req, res) => {
    try {
        const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId)});
        res.json(foods)
    } catch (err) {
        res.status(400).json({message: err})
    }
})

// GET BACK FOOD WITH EXPIRY DATE
router.get('/expiryDate/:fridgeId', verify, async (req, res) => {
    const check = isUserInFridge(res, req.params.fridgeId, req.user._userId);

    if(check) {
        try {
            const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId), expiryDate: {$ne: null}});
            res.json(foods)
        } catch (err) {
            res.status(400).json({message: err})
        }
    } else {
        return check;
    }
})

// GET BACK FOOD WITH OPENING DATE
router.get('/openingDate/:fridgeId', verify, async (req, res) => {
    const check = isUserInFridge(res, req.params.fridgeId, req.user._userId);

    if(check) {
        try {
            const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId), openingDate: {$ne: null}});
            res.json(foods)
        } catch (err) {
            res.status(400).json({message: err})
        }
    } else {
        return check;
    }
})

// GET BACK FOOD WITH PURCHASE DATE
router.get('/purchaseDate/:fridgeId', verify, async (req, res) => {
    const check = isUserInFridge(res, req.params.fridgeId, req.user._userId);

    if(check) {
        try {
            const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(req.params.fridgeId), purchaseDate: {$ne: null}});
            res.json(foods)
        } catch (err) {
            res.json({message: err})
        }
    } else {
        return check;
    }
})

// db.foods.insertOne({ name: "potato", expiryDate: "12/03/20", openingDate: "", type: "vegetable", fridgeId: ObjectId("5e0b7663ac11fe2b7e65c5a4")})

// CREATE FOOD
router.post('/', verify, async (req, res) => {
    const check = isUserInFridge(res, req.body.fridgeId, req.user._userId);

    if(check) {
        const food = new Food({
            name: req.body.name,
            expiryDate: req.body.expiryDate,
            openingDate: req.body.openingDate,
            purchaseDate: req.body.purchaseDate,
            type: req.body.type,
            fridgeId: mongoose.Types.ObjectId(req.body.fridgeId)
        });
        
        // Check if fridge exists
        const fridge = await Fridge.findById(food.fridgeId);
        if(fridge === null) {
            return res.status(400).json({message: "fridgeId is undefined or doesn't exist"})
        }
        
        try {
            const savedFood = await food.save()
            res.json(savedFood)
        } catch (err) {
            res.status(400).json({message: err})
        }
    } else {
        return check;
    }

});

// GET SPECIFIC FOOD 
// --- NOT USED
router.get('/:foodId', async (req, res) => {
    try {
        const food = await Fridge.findById(req.params.foodId)
        res.json(food)
    }catch(err) {
        res.status(400).json({message: err})
    }
})


// DELETE FOOD
router.delete('/:foodId', verify, async (req, res) => {
    const check = isUserInFridge(res, req.body.fridgeId, req.user._userId);

    if(check) {
        try {
            const removedFood = await Food.deleteOne({_id: req.params.foodId})
            res.json(removedFood)
        }catch(err) {
            res.status(400).json({message: err})
        }
    } else {
        return check;
    }
})

// UPDATE FOOD
router.patch('/:foodId', verify, async (req, res) => {
    const check = isUserInFridge(res, req.body.fridgeId, req.user._userId);

    if(check) {
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
            res.status(400).json({message: err})
        }
    } else {
        return check;
    }
})

const deleteFoods = async (res, fridgeId) =>  {
    const foods = await Food.find({fridgeId: mongoose.Types.ObjectId(fridgeId)});
    for(let food of foods) {
        try {
            const removedFood = await Food.deleteOne({_id: food._id})
        }catch(err) {
            res.status(400).json({message: err})
        }
    }
}

module.exports = {
    router: router,
    deleteFoods: deleteFoods
};