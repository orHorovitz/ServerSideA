//-  Daniella Boaz 209371913, Or Horovitz 316283944
// - app.js

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const addRouter = require('./routes/addcalories');
const reportRouter = require('./routes/report');


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
const uri =
    'mongodb+srv://orhorovitz123:NLxltDZQ8E9mtFJf@cluster0.t0r5fi2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//mongoose.set('bufferCommands', false);

// try to connect to MongoDB
mongoose.connect(uri, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/addcalories', addRouter);
app.use('/report', reportRouter);

// Error Handling for incorrect URL
app.use((req, res, next) => {
  res.status(404).send('URL not correct');
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;