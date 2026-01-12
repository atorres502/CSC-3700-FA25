import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function BookListV3({ books, title }) {
    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/BookDetails/${id}`);
    };

    const handleNewBook = () => {
        navigate("/Create");
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Sub Title: {title}</h3>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleNewBook}
                >
                    New Book
                </button>
            </div>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Link</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleDetails(book.id)}
                            >
                                Details {book.id}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookListV3;
