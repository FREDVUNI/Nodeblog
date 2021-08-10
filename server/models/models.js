const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    snippet:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
})
const blogDB = mongoose.model("blog",schema)
module.exports = blogDB