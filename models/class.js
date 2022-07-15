const mongoose = require('mongoose'); 

const classSchema = new mongoose.Schema({
    name: String
})

classSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('class', classSchema)
