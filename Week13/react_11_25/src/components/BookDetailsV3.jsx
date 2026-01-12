import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch.jsx";

function BookDetailsV2() {
    const { id } = useParams();                    // get id from URL
    const navigate = useNavigate();// for programmatic navigation
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const url = `${BASE_URL}/${id}`;
    console.log(url);
    // const url = `http://localhost:3333/books/${id}`;

    // call the hook *inside* the component
    const { data, error, isPending } = useFetch(url);

    // normalize data: expect a single book object
    const book = data && !Array.isArray(data) ? data : null;

    const handleDelete = async () => {
        const ok = window.confirm("Are you sure you want to delete this book?");
        if (!ok) return;

        try {
            const res = await fetch(url, {
                method: "DELETE",
                // For JSON Server, no body/headers needed for simple DELETE
            });

            if (!res.ok) {
                throw new Error(`Delete failed (status ${res.status})`);
            }

            // Optional: show a quick message
            // alert("Book deleted.");

            // Go back to home (or wherever you want)
            navigate("/");
        } catch (err) {
            alert(`Error deleting book: ${err.message}`);
        }
    };

    return (
        <div>
            <h2>Book Details {id}</h2>
            <p>The book you seek has id = {id}</p>

            {isPending && <div>Loading ...</div>}
            {error && <div>{error}</div>}

            {book && (
                <>
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description!!</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                        </tr>
                        </tbody>
                    </table>

                    <button
                        type="button"
                        className="btn btn-danger mt-3"
                        onClick={handleDelete}
                    >
                        Delete This Book
                    </button>
                </>
            )}
        </div>
    );
}

export default BookDetailsV2;

