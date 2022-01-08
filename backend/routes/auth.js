const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//REGISTER

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        //save user and return response
        const user = await newUser.save()
        res.status(200).send(user)
    } catch(error) {
        res.status(500).json(error)
    }
})

// LOGIN
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(400).send("Email or password does not match")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).send("Email or password does not match")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

module.exports = router