const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { response } = require('express');

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('exchanges'); 
    res.json(users); 
})

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate('exchanges'); 
  res.json(user);
});

usersRouter.post('/', async (request, response) => {
    const { username, password, contacts } = request.body; 
    const existingUser = await User.findOne({username})
    
    if (existingUser) {
        return response.status(400).json({ error: "username must be unique "})
    }

    const passwordHash = await bcrypt.hash(password, 10)
    console.log(request.body)
    const user = new User ({
        username, 
        passwordHash,
        contacts
    })
    const saved = await user.save();
    response.status(201).json(saved); 
})

usersRouter.put("/:id", async (req, res) => {
    console.log("hre")
    const user = req.body 
    const id = req.params.id
    console.log(id)
    console.log(user)
    const updated = await User.updateOne({id: id}, {$set: {contacts: user.contacts}})
    console.log(updated)
    const newUser = await User.findById(id).populate("exchanges")
    res.json(newUser)
});

module.exports = usersRouter