//-  Daniella Boaz 209371913, Or Horovitz 316283944
// -models/calories

const mongoose = require('mongoose');

// Counter Schema for tracking sequence numbers
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Calories Schema definition
const caloriesSchema = new mongoose.Schema({
    id: Number,
    user_id: Number,
    year: Number,
    month: Number,
    day: Number,
    description: String,
    category: String,
    amount: Number,
});

// Pre-save hook to generate the id before saving to the database
caloriesSchema.pre('save', async function (next) {
    if (this.isNew) {
        // Only generate new id if the document is new
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'caloriesId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }//return new document, create if not exists
            );
            // Assign the generated sequence number to 'id' field
            this.id = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Calories = mongoose.model('Calories', caloriesSchema);

module.exports = Calories;


