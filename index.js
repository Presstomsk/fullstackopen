require("dotenv").config() // add config from .env 
const express = require('express') //express
const morgan = require('morgan') //morgan 
const cors = require('cors')//cors
const app = express()
const Person = require('./models/person')//person from modul

app.use(cors())//middleware cors
app.use(express.static('build'))//static files
app.use(express.json()) //json
morgan.token('content', (req, res) => JSON.stringify(req.body))//create token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content')) //morgan loging

app.get('/info', (request, response) => { // rest get info
  Person.find({}).then(persons => {
    response.send(`Phonebook has info for ${persons.length} people<br/>${new Date()}`)
  })  
})

app.get('/api/persons', (request, response) => {// rest get all
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {//find person by Id
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }) 
})

app.delete('/api/persons/:id', (request, response) => { //rest delete by Id
  Person.findByIdAndDelete(request.params.id).then(person => {
    response.status(204).end()
  }) 
})
  
app.post('/api/persons', (request, response) => { // post add person
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }  
  
  const person = new Person({
    name: body.name,
    number: body.number || ""
  })  

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }) 
})  

const PORT = process.env.PORT// for deploy port from .env
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })//listen port
