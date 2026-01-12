import React, {useState} from "react";
import BookList from "./BookList";

function BookHomeV2() {
    const myTitle = "Books For Sale!";

    const [books, setBooks] = useState([
        {   title : "The FellowShip of the Ring", desc: "The first of the LOTR Trilogy", author: "Tolkien", id: 0 },
        { title : "The Two Towers", desc : "The second of the LOTR Trilogy", author: "J. R. Tolkien", id: 1 },
        { title : "The Return of the King", desc: "The Final Book  of the LOTR Trilogy", author: "J. R. Tolkien", id: 2 }
    ])
    const handleDelete = (id) => {
        const newBooks = books.filter((book) => book.id !== id)
        setBooks(newBooks);
    }
    return(
        //books='s and title='s arguments are the "props", or properties
        <div>
            <BookList books={books} title={myTitle} handleDelete={handleDelete} />
            <BookList books={books.filter((b ) => b.author == "Tolkien")} title={myTitle}
                      handleDelete={handleDelete} />
        </div>
    )
}
export default BookHomeV2;