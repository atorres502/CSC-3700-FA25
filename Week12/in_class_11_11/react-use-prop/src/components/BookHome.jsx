import { useState } from 'react'
function BookHome() {
    const myTitle = "Books For Sale!";

    const [books, setBooks] = useState([
        {   title : "The FellowShip of the Ring", desc: "The first of the LOTR Trilogy", author: "Tolkien", id: 0 },
        { title : "The Two Towers", desc : "The second of the LOTR Trilogy", author: "Tolkien", id: 1 },
        { title : "The Return of the King", desc: "The Final Book  of the LOTR Trilogy", author: "Tolkien", id: 2 }
    ])
    return(
        <div>
            <h2> Our Best Sellers </h2>
            <table className="table-striped table-bordered table-hover">
                <thead>
                <tr><th> Title </th><th> Author</th><th> Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map((book) => (
                        <tr key={book.id}>
                            <td> {book.title} </td>
                            <td> {book.author}</td>
                            <td> {book.desc}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
export default BookHome;