let moviesData = [];

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}/movies`;
async function fetchMovies() {
    try {
        const response = await fetch(BASE_URL);
        console.log('Response Status', response.status);
        console.log('Response OK', response.ok);
        if( !response.ok ){
            throw new Error(`Http Error Status${response.status}`);
        }
        const data = await response.json();
        console.log("DATA ->", data);
        moviesData = data;
        populateFilter();
        displayMovies();

    }   catch( error ){
        console.log("Error Fetching Data ->", error);
    }
}
function populateFilter() {
    const select = document.getElementById("selectDirector");
    const directors = [...new Set(moviesData.map(movie => movie.director))];

    select.innerHTML = '<option value="All">All Directors</option>';

    directors.forEach(director => {
        const option = document.createElement("option");
        option.textContent = director;
        select.appendChild(option);
    });
}
function displayMovies(movies = moviesData) {
    const tBody = document.getElementById("tableBody");
    tBody.innerHTML = ' ';
    const PORT = 3000;
    const BASE_URL = `http://localhost:${PORT}/movies`;
    movies.forEach( function(movie){
        const card = document.createElement("tr");
        card.innerHTML = `
                <th scope="row">${movie.title}</th>
                <td>${movie.director}</td>
                <td>${movie.year}</td>
                <td>${movie.boxOffice}</td>
                <td>${movie["actors"][0].name}</td>
                <button onclick="showMovieDetails('${movie.id}')" class="col-12 btn btn-info">View Details</>
                <button onclick="deleteMovie('${movie.id}')" class="btn btn-danger">Delete</button></td>
            `
        tBody.appendChild(card);
    })
}
function showMovieDetails(id) {
    const movie = moviesData.find(m => m.id === id);
    if (!movie) {
        alert("Movie not found.");
        return;
    }
    const modalBody = document.getElementById("movieModalBody");
    const modalTitle = document.getElementById("movieModalLabel");

    modalTitle.textContent = movie.title;

    modalBody.innerHTML = `
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Year:</strong> ${movie.year}</p>
        <p><strong>Box Office:</strong> ${movie.boxOffice}</p>
        <p><strong>Budget:</strong> ${movie.budget}</p>
        <p><strong>Description:</strong> ${movie.description}</p>
        <p><strong>Actors:</strong></p>
        <ul>
            ${movie.actors.map(actor => `<li>${actor.name} as ${actor.role}</li>`).join('')}
        </ul>
    `;

    const modal = new bootstrap.Modal(document.getElementById('movieModal'));
    modal.show();
}
function filterByDirector() {
    const selected = document.getElementById("selectDirector").value;

    const filteredMovies = (selected) === "All" ? moviesData
        : moviesData.filter(movie => movie.director === selected);

    displayMovies(filteredMovies);
}
function clearFilter() {
    const select = document.getElementById("selectDirector");
    select.value = "All";
    displayMovies(moviesData);
}
function clearForm() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
    inputs.forEach(input => input.value = '');

    const selects = document.querySelectorAll('select');
    selects.forEach(select => select.selectedIndex = 0);

    clearErrors();

    const alertBox = document.getElementById("alertBox");
    if (alertBox) {
        alertBox.textContent = '';
        alertBox.style.display = 'none';
    }
}
async function deleteMovie(movieID) {
    if (!confirm('Are you sure you want to delete this movie?')) {
        return;
    }

    try {
        const DELETE_URL = `${BASE_URL}/${movieID}`;
        alert( 'Delete:' + DELETE_URL )
        const response = await fetch( DELETE_URL, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Movie deleted:', movieID);

        // Refresh the books list
        await displayMovies();

        alert('Movie deleted successfully!');
        location.reload();
    } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Error deleting movie. Please check the console for details.');
    }
}
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.textContent = '');
}
async function addNewMovie() {
    clearErrors();
    const title = document.getElementById("movieTitle").value.trim();
    const yearRaw = document.getElementById("year").value.trim();
    const description = document.getElementById("description").value.trim();
    const director = document.getElementById("director").value.trim();
    const budgetRaw = document.getElementById("budget").value.trim();
    const boxOfficeRaw = document.getElementById("boxOffice").value.trim();
    const actor = document.getElementById("actor").value.trim();
    const role = document.getElementById("role").value.trim();

    const year = parseInt(yearRaw, 10);
    const budget = parseInt(budgetRaw, 10);
    const boxOffice = parseInt(boxOfficeRaw, 10);

    let hasError = false;

    if (!title) {
        document.getElementById("titleError").textContent = "Title is required.";
        hasError = true;
    } else if (title.length < 3) {
        document.getElementById("titleError").textContent = "Title must be at least 3 characters.";
        hasError = true;
    }

    if (!yearRaw) {
        document.getElementById("yearError").textContent = "Year is required.";
        hasError = true;
    } else if (isNaN(year) || year < 1880 || year > 2025) {
        document.getElementById("yearError").textContent = "Year must be between 1880 and 2025.";
        hasError = true;
    }

    if (!description) {
        document.getElementById("descriptionError").textContent = "Description is required.";
        hasError = true;
    } else if (description.length < 10 || description.length > 500) {
        document.getElementById("descriptionError").textContent = "Description must be 10–500 characters.";
        hasError = true;
    }

    if (!director) {
        document.getElementById("directorError").textContent = "Director is required.";
        hasError = true;
    } else if (director.length < 3) {
        document.getElementById("directorError").textContent = "Director name must be at least 3 characters.";
        hasError = true;
    }

    if (!budgetRaw) {
        document.getElementById("budgetError").textContent = "Budget is required.";
        hasError = true;
    } else if (isNaN(budget) || budget < 1 || budget > 1000) {
        document.getElementById("budgetError").textContent = "Budget must be a number between 1 and 1000.";
        hasError = true;
    }

    if (!boxOfficeRaw) {
        document.getElementById("boxOfficeError").textContent = "Box Office is required.";
        hasError = true;
    } else if (isNaN(boxOffice) || boxOffice < 0) {
        document.getElementById("boxOfficeError").textContent = "Box office must be at least 0.";
        hasError = true;
    }

    if (!actor) {
        document.getElementById("actorError").textContent = "Actor is required.";
        hasError = true;
    } else if (actor.length < 3 || actor.split(" ").filter(Boolean).length < 2) {
        document.getElementById("actorError").textContent = "Actor must be at least 3 characters and 2 words.";
        hasError = true;
    }

    if (!role) {
        document.getElementById("roleError").textContent = "Role is required.";
        hasError = true;
    } else if (role.length < 3) {
        document.getElementById("roleError").textContent = "Role must be at least 3 characters.";
        hasError = true;
    }

    if (hasError) return;
    const newMovie = {
        title: title,
        description: description,
        year: parseInt(yearRaw),
        boxOffice: boxOffice + "M",
        director: director,
        budget: budgetRaw + "M",
        actors: [{name: actor, role: role}]
    }
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchMovies();

        const alertBox = document.getElementById("alertBox");
        alertBox.textContent = "Movie entered successfully!";
        alertBox.style.display = "block";


    } catch (error) {
        console.error('Error adding movie:', error);
        alert('Error adding movie. Please check the console.');
    }
}