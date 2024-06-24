//-  Daniella Boaz 209371913, Or Horovitz 316283944
//- controllers/caloriesController

const caloriesModel = require('../models/calories');

// Function to create a new calories entry
async function createCalories(caloriesData) {
    try {
        const calories = new caloriesModel(caloriesData);
        await calories.save();
        return calories;
    } catch (error) {
        console.error('Error creating calories entry:', error);
        throw error;
    }
}

// Get report by user_id
async function getCaloriesByUserId(user_id) {
    try {
        const calories = await caloriesModel.find({ user_id });
        return calories;
    } catch (error) {
        console.error('Error getting calories entries by user_id:', error);
        throw error;
    }
}


// Generate detailed calories report for specific month, year, and user_id
async function generateCaloriesReport(user_id, month, year) {
    try {
        const calories = await caloriesModel.find({
            user_id,
            month,
            year
        });

        // Initialize an object to store the report
        const report = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: []
        };

        // Populate the report object based on category
        calories.forEach(calorie => {
            switch (calorie.category.toLowerCase()) {
                case 'breakfast':
                    report.breakfast.push({
                        day: calorie.day,
                        description: calorie.description,
                        amount: calorie.amount
                    });
                    break;
                case 'lunch':
                    report.lunch.push({
                        day: calorie.day,
                        description: calorie.description,
                        amount: calorie.amount
                    });
                    break;
                case 'dinner':
                    report.dinner.push({
                        day: calorie.day,
                        description: calorie.description,
                        amount: calorie.amount
                    });
                    break;
                default:
                    report.other.push({
                        day: calorie.day,
                        description: calorie.description,
                        amount: calorie.amount
                    });
            }
        });

        // Ensure all categories (even empty ones) are included in the report
        ['breakfast', 'lunch', 'dinner', 'other'].forEach(category => {
            if (!report[category].length) {
                report[category] = [];
            }
        });

        return report;
    } catch (error) {
        console.error('Error generating calories report:', error);
        throw error;
    }
}


module.exports = { createCalories ,getCaloriesByUserId ,generateCaloriesReport };
