import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const today = new Date().toISOString().split("T")[0];
    const maxChars = 300;

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Email is not valid.";

        if (!message.trim()) newErrors.message = "Message is required.";
        else if (message.trim().length < 10)
            newErrors.message = "Message must be at least 10 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setSubmittedData({
                name,
                email,
                date: today,
                message,
            });

            setName("");
            setEmail("");
            setMessage("");
            setErrors({});
        }
    };

    return (
        <div className="container mt-3">
            <h2 className="mt-3">Contact</h2>
            <Link to="/" className="text-decoration-none">
                ← Back to Home
            </Link>

            <form className="mt-4" onSubmit={handleSubmit} noValidate>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Student Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Date</label>
                    <input
                        type="text"
                        className="form-control"
                        value={today}
                        disabled
                    />
                    <div className="form-text">This is automatically set to today's date.</div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                        rows="4"
                        placeholder="Write your message here (at least 10 characters)…"
                        maxLength={maxChars}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="text-secondary small">
                        {message.length} / {maxChars} characters
                    </div>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                    Submit Contact Info
                </button>
            </form>

            {submittedData && (
                <div className="card mt-4" style={{ backgroundColor: "#d4edda", borderColor: "#c3e6cb" }}>
                    <div className="card-body">
                        <h5 className="card-title fw-bold mb-3">Submission Summary</h5>
                        <p className="mb-1"><b>Name:</b> {submittedData.name}</p>
                        <p className="mb-1"><b>Email:</b> {submittedData.email}</p>
                        <p className="mb-1"><b>Date:</b> {submittedData.date}</p>
                        <p className="mb-1"><b>Message:</b> {submittedData.message}</p>
                    </div>
                </div>
            )}


        </div>
    );
}

export default Contact;
