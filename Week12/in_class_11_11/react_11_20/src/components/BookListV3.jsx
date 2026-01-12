import React from 'react';
function BookListV3( {books, title, handleDelete}) {
    // const books = props.books;
    // const title = props.title;
    console.log("Books="); console.log(books);
    console.log("title="); console.log(title);
    return (
        <div>
            <h3> Sub Title:{title}</h3>
            <table className="table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th> Title</th>
                    <th> Author</th>
                    <th> Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map((book) => (
                        <tr key={book.id}>
                            <td> {book.title} </td>
                            <td> {book.author}</td>
                            <td> {book.description}</td>
                            <td>
                               <button className="btn btn-danger" onClick={ () =>
                                   handleDelete(book.id)
                               }> Delete {book.id} </button>

                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default BookListV3;