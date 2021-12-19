const { response } = require("express");
const { findByIdAndUpdate } = require("../models/models");
const blogDB = require("../models/models")

exports.getPosts = (req,res)=>{
    if(req.query.id){
        const id = req.query.id
        blogDB.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).render("404",{title:"404 Error"})
            }else{
                res.send(data)
            }
        })
    }else{
        blogDB.find().sort({ _id:-1 })
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "something went wrong."
            })
        })
    }
}
exports.createPost =(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:`Fill out all the fields.`
        })
        return;
        }
        const post = new blogDB({
            title:req.body.title,
            snippet:req.body.snippet,
            email:req.body.email,
            body:req.body.body
        })  

        post.save(post)
        .then(data=>{
            // res.send(data)
            res.redirect("/blogs")
        })
        .catch(error=>{
            res.status(500).send({
                message:error.message || `something went wrong.`
            })
        })
    }
    exports.deletePost = (req,res)=>{
        const id = req.query.id
        if(id){
            blogDB.findByIdAndDelete(id)
            .then(response=>{
                res.json({redirect:"/blogs"})
            })
            .catch(error=>{
                console.log(`something went wrong ${error}`);
                res.status(404).send({
                    message:message.error || `something went wrong`
                })
            })
        }else{
            console.log(`Failed to find the id ${id}`);
        }
    }
    exports.updatePost = (req,res) =>{
        if(!req.body){
            res.status(400).send({
                message:`Fill out the fields.`
            })
        }
        const id = req.query.id
        if(id){
            blogDB = findByIdAndUpdate(id,req.body.record,{UseFindAndModify:true})
            .then(response=>{
                res.status(404).send({
                    message:message.error || `Failed to find post with id ${id}`
                })
            })
        }else{
            console.log(`Failed to find the id ${id}`);
        }
    }