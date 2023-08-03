const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://permyakovr1984:${password}@cluster0.zno1smf.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
    name: name,
    number: number,
})

if (name !== undefined) {
    person.save().then(result => {
        console.log('person saved!')        
    })
} else {
    console.log('person info is not correct!')   
}

Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
})