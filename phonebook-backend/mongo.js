const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.eyzuqx1.mongodb.net/phonebookApp?retryWrites=true&w=majority
  `

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

    
if (process.argv.length > 4){
    const name = process.argv[3]
    const number = process.argv[4]

    console.log('Usage: node mongo.js password name number')
    const person = new Person({
        name: `${name}`,
        number: `${number}`
    })

    person.save().then(result => {
        console.log(`added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person =>{
            console.log(`${person.name}`, `${person.number}`)
        })
        mongoose.connection.close()
    })
}
