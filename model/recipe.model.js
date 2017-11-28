const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const RecipeSchema = new Schema({
    name: String,
    description: String,
    imagePath: String,
    ingredients: String

}, {
    timestamps: true
});



const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;