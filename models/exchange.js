const mongoose = require('mongoose'); 

const exchangeSchema = new mongoose.Schema({
    "user": String, 
    "finding": String, 
    "exchanging": [{
        type: String
    }], 
    "description": String, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = mongoose.model('Exchange', exchangeSchema)