const mongoose = require('mongoose')//mongoose MongoDB

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI//uri from .env

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({   
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8
    },
})
    
personSchema.set("toJSON", {//corect shema
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
    
module.exports = mongoose.model('Person', personSchema) //export