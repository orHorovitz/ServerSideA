//-  Daniella Boaz 209371913, Or Horovitz 316283944
// routes/report.js

const express = require('express');
const router = express.Router();
const caloriesController = require('../controllers/caloriesController');

// GET detailed report for specific month, year, and user_id
router.get('/', async function(req, res) {
    const { user_id, month, year } = req.query;

    // check if the user insert all the parameters
    if (!user_id || !month || !year) {
        return res.status(400)
            .json({ error: '' +
                    'Missing parameters: user_id, month, and year are required.' });
    }

    try {
        const report = await caloriesController
            .generateCaloriesReport(user_id, parseInt(month), parseInt(year));
        res.json(report); // Respond with JSON data
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;