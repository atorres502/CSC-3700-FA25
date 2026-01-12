import React from "react";
import { Link } from "react-router-dom";   // ✅ import Link
function BookListV4({ books, title, handleDelete }) {
    return (
        <div>
            <h3>Sub Title: {title}</h3>

            <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.desc || book.description}</td>

                        <td>
                            {/* Link to the BookDetails route */}
                            <Link
                                to={`/BookDetails/${book.id}`}
                                className="btn btn-primary me-2"
                            >
                                Details
                            </Link>

                            {/* Delete button */}
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(book.id)}
                            >  Delete  </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookListV4;
