import './App.css'
import NavBar   from "./components/NavBar.jsx";
// import BookHomeV6 from "./components/BookHomeV6.jsx";
import BookHomeV7 from "./components/BookHomeV7.jsx";
function App() {
    return (
        <>
            <NavBar/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2> Books 4 U </h2>
                    </div>
                    <div className="col-md-6">
                        <BookHomeV7 />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
