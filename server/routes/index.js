const express = require("express")
const router = express.Router()
const blogController = require("../controllers/controller")
const { default: axios } = require("axios")
// const blogDB = require("../models/models")

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
router.get("/:id",(req,res)=>{
    const id = req.params.id
    axios.get(`http://localhost:3000/blogs/api/posts?id=${id}`)
    .then(response=>{
        res.render("details",{title:"Blog post",blog:response.data})
    })
    .catch(error=>{
        res.send(error)
    })
})
router.get("/api/posts",blogController.getPosts)
router.post("/api/posts",blogController.createPost)

router.use((req,res)=>{
    res.render("404",{title:"404 Error"})
})

module.exports = router