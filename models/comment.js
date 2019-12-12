// models/comment.js
const mongoose = require('mongoose');
const User=require('./user');
const Publication=require('./publication')
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    content: {
        type: String,
    },
    date: {
        type: Date
    },
    creater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    publication:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Publication'
    }


});
module.exports = Comment = mongoose.model('Comment', CommentSchema);