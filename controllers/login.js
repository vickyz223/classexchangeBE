const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { response } = require('express')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body; 

    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash); 

    if (!user || !passwordCorrect) {
        return res.status(401).json({ error: "incorrect username or password" })
    }
     const userForToken = {
        username: user.username,
        id: user._id,
    }
    try {
        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(200).send({ token, username: user.username, id: user._id, contacts: user.contacts });
    } catch(error) {
        res.status(401).json({error: "Your session is invalid or expired."})
    }
    
})

module.exports = loginRouter; 