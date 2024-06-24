// Daniella Boaz 209371913, Or Horovitz 316283944
// routes/about.js

const express = require('express');
const router = express.Router();

// Define array of developers
const developers = [
    { firstname: 'Or', lastname: 'Horovitz', id: 316283944, email: 'orhorovitz123@gmail.com' },
    { firstname: 'Daniella', lastname: 'Boaz', id: 209371913, email: 'daniellaboaz22@gmail.com' }
];

// Route to get JSON array of developers
router.get('/', (req, res) => {
    res.json({ developers }); // Return JSON object
});

module.exports = router;