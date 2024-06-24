//-  Daniella Boaz 209371913, Or Horovitz 316283944
// routs/index.js

const express = require('express');
const router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;
