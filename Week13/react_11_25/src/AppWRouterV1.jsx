import './App.css';
// import NavBar from "./components/NavBar";
import NavLinkBar from './components/NavLinkBar.jsx';
import About from "./components/About.jsx";
import { Routes, Route } from 'react-router-dom';
import NotFound from "./components/NotFound.jsx";
import BookHomeV7 from "./components/BookHomeV7.jsx";
import BookDetails from "./components/BookDetailsV3.jsx";
import Create from "./components/Create.jsx";

function App() {
    return (
        <>
            {/*<NavBar />*/}
            <NavLinkBar/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2> Books 4 U </h2>
                    </div>
                    <div className="col-md-6">
                        <Routes>
                            <Route path="/" element={<BookHomeV7 />}></Route>
                            <Route path="/about" element={<About />}></Route>
                            <Route path="/Create" element={<Create />}></Route>
                            <Route path="/BookDetails/:id" element={<BookDetails />}></Route>
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
