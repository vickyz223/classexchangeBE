const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { response } = require('express');

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('exchanges'); 
    res.json(users); 
})

usersRouter.post('/', async (request, response) => {
    const { username, password } = request.body; 
    const existingUser = await User.findOne({username})
    
    if (existingUser) {
        return response.status(400).json({ error: "username must be unique "})
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User ({
        username, 
        passwordHash
    })
    const saved = await user.save(); 
    response.status(201).json(saved); 
})

module.exports = usersRouter