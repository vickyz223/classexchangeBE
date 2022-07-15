const exchangeRouter = require('express').Router(); 
const Exchange = require('../models/exchange'); 

exchangeRouter.get('/', async (request, response) => {
    const exchanges = await Exchange.find({}); 
    console.log(exchanges)
    response.json(exchanges); 
})

exchangeRouter.post('/', async (request, response) => {
    const body = request.body; 
    const exchange = new Exchange({
        user: body.user, 
        finding: body.finding, 
        exchanging: body.exchanging, 
        description: body.description, 
    })
    const posted = await exchange.save(); 
    response.json(posted); 
})

exchangeRouter.post

module.exports = exchangeRouter;