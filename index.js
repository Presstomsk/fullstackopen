const express = require('express') //express
const morgan = require('morgan') //morgan 
const cors = require('cors')//cors

const app = express()
app.use(cors())//middleware
app.use(express.json()) 
morgan.token('content', (req, res) => JSON.stringify(req.body))//create token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => { // rest get
  response.send(`Phonebook has info for ${notes.length} people<br/>${new Date()}`)
})

app.get('/api/persons', (request, response) => {// rest get all
  response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
    
  if (note) {   
    response.json(note)  //to json
  } else { 
    response.status(404).end()  // if not found
  }
})

app.delete('/api/persons/:id', (request, response) => { //rest delete 
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => { // id generator
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}
  
app.post('/api/persons', (request, response) => { // post
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if (notes.find(note => note.name === body.name)){
    return response.status(400).json({
      error: 'person with that name has already been added'
    })
  }
  
  const note = {
    name: body.name,
    number: body.number || "",
    id: generateId(),
  }
  
  notes = notes.concat(note)
  
  response.json(note)
})  

const PORT = process.env.PORT || 3001// for deploy
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })//listen port
