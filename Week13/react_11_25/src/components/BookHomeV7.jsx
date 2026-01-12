import React from "react";
import BookList from "./BookListV3.jsx";
import useFetch from "./useFetch.jsx";

const BookHomeV7 = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const url = `${BASE_URL}`;
    console.log("url=", url);
    const { data = [], isPending, error } =
        useFetch(`${url}`);
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
