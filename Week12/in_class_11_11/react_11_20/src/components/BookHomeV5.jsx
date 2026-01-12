import React, {useEffect, useState} from "react";
import BookListV3 from "./BookListV3.jsx";

const BookHomeV5 = () => {
    const myTitle = "Books For Sale!";

    const [books, setBooks] = useState([]); // Initialize as an empty array
    const handleDelete = (id) => {
        const newBooks = books.filter((book) => book.id !== id);
        setBooks(newBooks);
    }
    const [ isPending, setIsPending] = useState(true);


    useEffect(() => {
        let url = "http://localhost:3333/books";
        setTimeout(() => {

            fetch(url)
                .then(resp => {
                    return resp.json();
                }).then(
                data => {
                    console.log(data);
                    setIsPending(false);
                    setBooks(data);
                }).catch( error => {
                    console.log(error);
            })
            console.log("Use Effect Is Running");
            console.log(books);
        }, [2000])
    }, )
    return(
                <div>
                    {isPending && <div> Loading ... </div> }
                    {books &&
                        <BookListV3 books={books} title={myTitle}
                                    handleDelete={handleDelete} />}
                </div>
    )
}
export default BookHomeV5;