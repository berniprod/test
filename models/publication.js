// models/publication.js
const Product=require('./product');
const mongoose = require('mongoose');
const Files=require('./product')
const Schema = mongoose.Schema;
const PublicationSchema = new Schema({
    id_pub: {
        type: String,
        required: true,
        unique: true
    },
    type:{
        type:String
    },
    contenu:{
        type:String,
    },
    image: {
        type: Files
    },
    video:{
        type: Files
    },
    date:{
        type:String,
    },
    pub_product:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Product'
    }

});
module.exports = Publication = mongoose.model('Publication', PublicationSchema);