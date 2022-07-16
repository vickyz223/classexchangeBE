const exchangeRouter = require('express').Router(); 
const Exchange = require('../models/exchange'); 
const User = require('../models/user')

exchangeRouter.get('/', async (request, response) => {
    const exchanges = await Exchange.find({}).populate('user', {username: 1}); 
    console.log(exchanges)
    response.json(exchanges); 
})

exchangeRouter.post('/', async (request, response) => {
    const body = request.body; 
    const user = await User.findById(body.userId) 

    if (body == undefined) {
        request.status(400).json({error: 'content missing'})
    }

    const exchange = new Exchange({
        user: user._id, 
        finding: body.finding, 
        exchanging: body.exchanging, 
        description: body.description, 
    })
    const posted = await exchange.save(); 
    user.exchanges = user.exchanges.concat(posted._id)
    await user.save(); 

    response.json(posted); 
})

exchangeRouter.post

module.exports = exchangeRouter;