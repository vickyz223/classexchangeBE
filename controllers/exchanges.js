const exchangeRouter = require('express').Router(); 
const Exchange = require('../models/exchange'); 
const ObjectId = require('mongodb').ObjectId

exchangeRouter.get('/', async (request, response) => {
    const exchanges = await Exchange.find({}).populate('user', {username: 1}); 
    response.json(exchanges); 
})

exchangeRouter.get("/:id", async (req, response) => {
    const exchange = await Exchange.findById(req.params.id).populate("user", {username: 1, contacts: 1}); 
    if (exchange) {
        response.json(exchange)
    } else {
        response.status(400).json({error: "The exchange does not exist."})
    }
})

exchangeRouter.post('/', async (request, response) => {
    const body = request.body; 
    const user = request.user

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

exchangeRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const exchange = await Exchange.findById(ObjectId(id))
    
    await Exchange.deleteOne(exchange);
    response.status(204).end();
})

module.exports = exchangeRouter;