// models/categorie.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorieSchema = new Schema({
    nom_cat: {
        type: String,
        required: true,
        unique: true
    },
    description_cat: {
        type: String
    },

});
module.exports = Categorie = mongoose.model('Categorie', CategorieSchema);