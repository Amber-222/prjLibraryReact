//call in the model to use in methods
const Book = require('../models/bookModel.js')

//GET all books
const getBooks = async(req, res) => {
    try {
        const books = await Book.find({}) //goes to book section in mongo and pulls all books
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//GET a single book
const getBook = async(req, res) => {
    const id = req.params.id //get the id the user is looking for

    if (!id) {
        res.status(400).json({message: "Please provide an id to search for"})
    }

    try {
        const book = await Book.findById(id)

        if (!book) {
            res.status(404).json({message: "No book was found with that id"})
        }

        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//POST create new book
const createBook = async(req, res) => {
    const { title, author, isbn, edition } = req.body //from fron end app requests body, look for these fields
    if (!title || !author || !isbn || !edition) {
        res.status(400).json({message: "Please ensure that all fields are provided."})
    } 

    try {
        const book = await Book.create({title, author, isbn, edition}) //create new instance with given details
        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//PUT update a book
const updateBook = async(req, res) => {
    const id = req.params.id
    const { title, author, isbn, edition } = req.body

    try {
        const book = await Book.findByIdAndUpdate(id, {title, author, isbn, edition}, {new: true}) //find the book, see if any details have chanegd and update with th enew given details
        
        if (!book) {
            res.status(404).json({message: "No book was found with that id"})
        }

        res.status(202).json(book)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//DELETE delete a book
const deleteBook = async(req, res) => {
    const id = req.params.id

    if (!id) {
        res.status(400).json({message: "Please provide an id to search for"})
    }

    try {
        const book = await Book.findByIdAndDelete(id) //find the book and delete it

        if (!book) {
            res.status(404).json({message: "No book was found with that id"})
        }

        res.status(202).json(book)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}