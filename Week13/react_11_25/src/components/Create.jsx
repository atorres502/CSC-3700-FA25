// Create.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // form state
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            price: Number(price)
        };

        setIsPending(true);

        try {
            const res = await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook)
            });

            if (!res.ok) {
                throw new Error(`POST failed: ${res.status}`);
            }

            // After successful create → go home
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="container mt-3">
            <h2>Create a New Book</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-3">

                {/* Title */}
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Author */}
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                {/* Price */}
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Save Book"}
                </button>
            </form>
        </div>
    );
}

export default Create;
