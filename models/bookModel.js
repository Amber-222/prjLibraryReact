const mongoose = require('mongoose')

//create a schema, like a template for the book object
const bookSchema =  new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    edition: Number
})

//then define that the object references the schema and give it a name
const Book = mongoose.model('Book', bookSchema)

//export the object to reference elsewhere in the project
//will be used in the controllers to interface with the db 
module.exports = Book