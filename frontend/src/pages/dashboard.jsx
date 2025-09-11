import { useEffect, useState } from 'react'
import { getAllBooks, getBookByID, createBook, updateBook, deleteBook } from '../services/apiService.js'


export default function Dashboard() {
    const [books, setBooks] = useState([])
    const [selectedBookId, setSelectedBookId] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        ispn: '',
        edition: 0
    })

    const [updateData, setUpdateData] = useState({
        title: '',
        author: '',
        ispn: '',
        edition: 0
    })

    const fetchBooks = async () => {
         const res = await getAllBooks()
         setBooks(res.data)
    }

    useEffect(() => { //just calling another method
        fetchBooks() //fetch all books in background
    }, []) //[] for neot expecting this method to return anything

    const handleDelete = async (id) => {
        //promtp user to check they sure to delete the book
        if (window.confirm('Are you sure you want to remove this book?')) { //if yes delet book with the id
            await deleteBook(id)
            fetchBooks() //then refresh the table of books 
        }
    }

    const handleInputChange = (e) => { //expects an event like typing or pasting
        setFormData({...formData, [e.target.name]: e.target.value}) //adds new input into formData variable (updates as user types) '...' for previous state of form 
    }

    const handleUpdateInputChange = (e) => { //expects an event like typing or pasting
        setUpdateData({...updateData, [e.target.name]: e.target.value}) //adds new input into formData variable (updates as user types) '...' for previous state of form 
    }

    const handleSubmit = async (e) => {
        e.preventDefault() //prevents from button clicking on page load up
        await createBook(formData)
        alert('Book created!')
        setFormData({ //reset th eform back to empty
            title: '',
            author: '',
            ispn: '',
            edition: 0
        })
        fetchBooks()
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        await updateBook(e.target.value, updateData)
        alert('Book updated!')
        fetchBooks()
    }

    const handleReset = () => {
        setFormData({ //reset th eform back to empty
            title: '',
            author: '',
            ispn: '',
            edition: 0
        })
    }

    const handleSelectItem = async (e) => {
        const _id = e.target.value
        setSelectedBookId(_id)

        if (_id) {
            const res = await getBookByID(_id)
            setUpdateData(res.data)
        }
        else {
            setFormData({ //reset th eform back to empty
            title: '',
            author: '',
            ispn: '',
            edition: 0
        })
        }
    }

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
                            <th>Ispn</th>
                            <th>Edition</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 && ( //prints message across the table that theres nothing from api
                            <tr>
                                <td colSpan = "5">No books available</td>
                            </tr>
                        )}
                        {books.map( book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.ispn}</td>
                                <td>{book.edition}</td>
                                <td>
                                    <button onClick={() => {handleDelete(book._id)}}>Delete Book</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>Add a New Book</h3> 
                <form onSubmit= {handleSubmit}> 
                    <input 
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    >
                    </input>

                    <br></br>

                    <input 
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                    >
                    </input>

                    <br></br>

                    <input 
                        type="text"
                        name="ispn"
                        placeholder="ISPN"
                        value={formData.ispn}
                        onChange={handleInputChange}
                        required
                    >
                    </input>

                    <br></br>

                    <input 
                        type="number"
                        name="edition"
                        placeholder="Edition"
                        value={formData.edition}
                        onChange={handleInputChange}
                        required    
                    >
                    </input>

                    <br></br>

                    <button type="submit" onClick={fetchBooks}>Submit</button>
                    <button type="reset" onClick={handleReset}>Reset</button>
                </form>
            </div>
            <div>
                <h3>Work with a single book</h3>
                <label>Select which book to work with</label>
                <select value={selectedBookId} onChange={handleSelectItem}>
                    <option value=''>-- Select Book --</option>
                    {books.map(book =>( //like a foreach loop 
                        <option key={book._id} value={book._id}>{book.title}</option> //foreach book, generate new select option to click
                    ))}
                </select>

            <div>
                <h3>Add a New Book</h3> 
                    <form onSubmit = {handleUpdate}> 
                        <input 
                            type="text"
                            name="title"
                            placeholder="Book Title"
                            value={updateData.title}
                            onChange={handleUpdateInputChange}
                            required
                        >
                        </input>

                        <br></br>

                        <input 
                            type="text"
                            name="author"
                            placeholder="Author"
                            value={updateData.author}
                            onChange={handleUpdateInputChange}
                            required
                        >
                        </input>

                        <br></br>

                        <input 
                            type="text"
                            name="ispn"
                            placeholder="ISPN"
                            value={updateData.ispn}
                            onChange={handleUpdateInputChange}
                            required
                        >
                        </input>

                        <br></br>

                        <input 
                            type="number"
                            name="edition"
                            placeholder="Edition"
                            value={updateData.edition}
                            onChange={handleUpdateInputChange}
                            required    
                        >
                        </input>

                        <br></br>

                        <button type="submit">Update Book</button>
                        <button type="reset" onClick={handleReset}>Reset</button>
                    </form>
                </div>
            </div>
        </div>
    )
}