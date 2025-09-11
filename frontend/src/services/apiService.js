//import singleton for axios
import axios from '../interfaces/axiosInstance.js'

//GET ALL BOOKS FROM API
export const getAllBooks = () => axios.get('/books')

//GET BOOK BY ID
export const getBookByID = (id) => axios.get(`/books/${id}`)

//POST REQUEST TO ADD BOOK
export const createBook = (bookData) => axios.post('/books', bookData)

//PUT REQUEST TO ADD BOOK
export const updateBook = (id, bookData) => axios.put(`/books/${id}`, bookData)

//DELETE REQUEST TO ADD BOOK
export const deleteBook = (id) => axios.delete(`/books/${id}`)