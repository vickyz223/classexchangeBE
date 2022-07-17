const exchangeRouter = require('express').Router(); 
const Exchange = require('../models/exchange'); 
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

exchangeRouter.get('/', async (request, response) => {
    const exchanges = await Exchange.find({}).populate('user', {username: 1}); 
    response.json(exchanges); 
})

exchangeRouter.post('/', async (request, response) => {
    const body = request.body; 
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

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