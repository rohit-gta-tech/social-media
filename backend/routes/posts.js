const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

// create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch(error) {
        res.status(500).json(error)
    }
})
// update a post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post has been updated successfully")
        } else {
            res.status(403).json("Access to update this post is forbidden to the user")
        }
    } catch(error) {
        res.status(500).json(error)
    }
})
// delete a post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json("Post has been deleted successfully")
        } else {
            res.status(403).json("Access to delete this post is forbidden to the user")
        }
    } catch(error) {
        res.status(500).json(error)
    }
})
// like & stop liking a post

router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId }})
            res.status(200).json("Post has been liked successfully")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId }})
            res.status(200).json("Post has been removed from your likes successfully")
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
})
// get a post

router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch(error) {
        res.status(500).json(error)
    }
})

// get a user's all posts

router.get("/profile/:username", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id })
        res.status(200).json(posts)
    } catch(error) {
        res.status(500).json(error)
    }
})



// get timeline posts 

router.get("/timeline/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({ userId: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )
        console.log('hey', friendPosts)
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch(error) {
        res.status(500).json(error)
    }
})

module.exports = router