//-  Daniella Boaz 209371913, Or Horovitz 316283944
// routs/addcalories.js

const express = require('express');
const router = express.Router();
const caloriesController = require('../controllers/caloriesController');

router.get('/', function(req, res, next) {
    res.render('addcalories', { college: 'addcalories' });
});

// POST request to handle submission from server
router.post('/', async (req, res) => {
    try {
        const { user_id, year, month, day, description, category, amount } = req.body;

        // Create calories entry
        const caloriesData = {
            user_id: parseInt(user_id),
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day),
            description,
            category,
            amount: parseInt(amount)
        };

        const newCaloriesEntry = await caloriesController.createCalories(caloriesData);

        // Check if newCaloriesEntry is falsy or null and throw an error if it is.
        if (!newCaloriesEntry) {
            throw new Error('Failed to create calories entry');
        }
        // Respond with the newly created entry
        res.status(201).json(newCaloriesEntry);
    } catch (error) {
        console.error('Error adding calories:', error);
        // Return error message as JSON response
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;


