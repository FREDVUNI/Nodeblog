const express = require("express")
const router = express.Router()
const blogController = require("../controllers/controller")
const { default: axios } = require("axios")
const blogDB = require("../models/models")

router.get("/",(req,res)=>{
    axios.get("http://localhost:3000/blogs/api/posts")
    .then(response=>{
        res.render("index",{title:"Home",blogs:response.data})
    })
    .catch(error=>{
        res.redirect(404)
        res.send(error)
    })
})
router.get("/about",(req,res)=>{
    res.render("about",{title:"About"})
})
router.get("/create",(req,res)=>{
    res.render("create",{title:"Create Post"})
})
router.get("/update",(req,res)=>{
    res.render("update",{title:"Edit Post"})
})

router.get("/:id",(req,res)=>{
    const id = req.params.id
    axios.get(`http://localhost:3000/blogs/api/posts?id=${id}`)
    .then(response=>{
        res.render("details",{title:"Blog post",blog:response.data})
    })
    .catch(error=>{
        res.status(404).render("404",{title:"404 Error"})
    })
})
router.delete("/:id",(req,res)=>{
    const id = req.params.id
    axios.delete(`http://localhost:3000/blogs/api/posts?id=${id}`)
    .then(response=>{
        res.redirect("/blogs")
    })
    .catch(error=>{
        // res.status(404).send({
        //     message:message.error || `something went wrong`
        // })
        res.render()
    })
})

router.get("/api/posts",blogController.getPosts)
router.post("/api/posts",blogController.createPost)
router.put("/api/posts",blogController.updatePost)
router.delete("/api/posts",blogController.deletePost)

router.use((req,res)=>{
    res.render("404",{title:"404 Error"})
})

module.exports = router