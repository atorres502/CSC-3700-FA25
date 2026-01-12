import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import useFetch from "./useFetch.jsx";

function RecipePlanner(props) {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const url = `${BASE_URL}`;
    console.log("url=", url);
    const { data = [], isPending, error } =
        useFetch(`${url}`);
    const recipes = Array.isArray(data) ? data : []; // turns null/objects into []

    return (
        <div >
            {isPending && <div>Loading ...</div>}
            {error && <div>{String(error)}</div>}
            {recipes.length > 0 &&
                <div>
                    <div className="row mb-5">
                        <h1> Recipe Planner - Home</h1>
                    </div>

                    <div className="border rounded-3  border-secondary-subtle">
                        <table className="table mb-0">
                            <thead>
                            <tr className="table-secondary">
                                <th colSpan="5" style={{ fontSize: "1.5rem" }}>All Recipes</th>
                            </tr>
                            <tr className="table-secondary">
                                <th scope="col">Title</th>
                                <th scope="col">Time</th>
                                <th scope="col">Difficulty</th>
                                <th scope="col">Ingredients</th>
                                <th scope="col">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recipes.map((recipe) => (
                                <tr key={recipe.id}>
                                    <td className="fw-bold">{recipe.title}</td>
                                    <td>{recipe.timeMinutes} min</td>
                                    <td>
                                        <span className="badge bg-secondary">
                                            {recipe.difficulty}
                                        </span>
                                    </td>
                                    <td>{recipe.ingredients.length}</td>
                                    <td className="text-secondary">{recipe.desc}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export default RecipePlanner;