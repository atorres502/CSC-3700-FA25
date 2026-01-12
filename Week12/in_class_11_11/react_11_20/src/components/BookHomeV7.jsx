import React from "react";
import BookList from "./BookListV3.jsx";
import useFetch from "./useFetch.jsx";

const BookHomeV7 = () => {
    const { data = [], isPending, error } =
        useFetch("http://localhost:3333/books/");
    const books = Array.isArray(data) ? data : []; // turns null/objects into []
    const title = "My Book List";

    return (
        <div className="row">
            {isPending && <div>Loading ...</div>}
            {error && <div>{String(error)}</div>}
            {books.length > 0 && <BookList books={books} myTitle={title} />}
        </div>
    );
};

export default BookHomeV7;
