const express = require('express')
const app = express()
let phones = require('./phones').phones

app.use(express.json())

const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan('tiny'))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => req.method !== 'POST'
  })
)

app.get('/api/persons', (request, response) => {
  response.json(phones)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${phones.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phones.find(personInList => personInList.id === id)
  if (person) {
    response.json(person)  
  } else {
    response.status(404).send({ error: 'Person not found' }) 
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const beforeLength = phones.length
  phones = phones.filter(phone => phone.id !== id)

  if (phones.length < beforeLength) {
    response.status(204).end()
  } else {
    response.status(404).send({ error: 'Person not found' })
  }
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'Name or number missing' })
  }

  if (phones.find(p => p.name === name)) {
    return response.status(400).json({ error: 'Name must be unique' })
  }

  const person = {
    id: String(Math.floor(Math.random() * 1e9)),
    name,
    number
  }

  phones.push(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
