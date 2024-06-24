//-  Daniella Boaz 209371913, Or Horovitz 316283944
// routes/user.js

const express = require('express');
const router = express.Router();
const caloriesController = require('../controllers/caloriesController');

// GET specific user report
router.get('/:user_id', async function(req, res) {
  try {
    const user_id = req.params.user_id;
    const calories =
        await caloriesController.getCaloriesByUserId(user_id);
    res.json(calories); // Respond with JSON data
  } catch (error) {
    console.error('Error getting calories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET products listing
router.get('/', function(req, res, next) {
  res.send('this is the users page, Please enter user id');
});

module.exports = router;