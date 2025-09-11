import { useEffect, useState } from 'react'
import { getAllBooks, getBookByID, createBook, updateBook, deleteBook } from '../services/apiService.js'


export default function Dashboard() {
    const [books, setBooks] = useState([])
    const [selectedBookId, setSelectedBookId] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        edition: 0
    })

    const fetchBooks = async () => {
         const res = await getAllBooks()
         setBooks(res.data)
    }

    useEffect(() => {
        fetchBooks() //fetch all books in background
    })

    return(
        <div>
            <h1>Library Dashboard Page</h1>
            <div>
                <h3>All Books</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Isbn</th>
                            <th>Edition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 && (
                            <tr>
                                <td colSpan = "4">No books available</td>
                            </tr>
                        )}
                        {books.map( book => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isbn}</td>
                                <td>{book.edition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}