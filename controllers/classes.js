const classRouter = require('express').Router(); 
const Class = require('../models/class'); 

classRouter.get('/', async (request, response) => {
    const classes = await Class.find({}); 
    response.json(classes);
})

classRouter.post('/', async (request, response) => {
    const body = request.body; 
    const newClass = new Class({
        name: body.name
    })
    const saved = await newClass.save(); 
    response.json(saved);
})

module.exports = classRouter;