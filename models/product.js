// models/product.js
const Categorie=require('./categorie');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const filesSchema= new Schema({
    originalname:{
        type:String
    },
    mimetype:{
        type:String
    },
    encoding:{
        type:String
    },
    createdAt:{
        type:String
    }
})
const ProductSchema = new Schema({
    code_product: {
        type: String,
    },
    nom_product:{
        type:String
    },
    image_Product:[{
        type:filesSchema
    }],
    description: {
        type: String
    },
    prix:{
        type:Number,
    },
    prod_categorie:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Categorie',
    }

});
const Product = mongoose.model('Product', ProductSchema);
const Files=mongoose.model('Files',filesSchema)

module.exports={Product,Files}