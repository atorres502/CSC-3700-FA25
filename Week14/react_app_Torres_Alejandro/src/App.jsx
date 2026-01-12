import './App.css';
import NavLinkBar from './components/NavLinkBar.jsx';
import About from "./components/About.jsx";
import { Routes, Route } from 'react-router-dom';
import NotFound from "./components/NotFound.jsx";
import Contact from "./pages/Contact.jsx";
import RecipePlanner from "./components/RecipePlanner.jsx";

function App() {
    return (
        <>
            <NavLinkBar/>
            <div className="container mt-5">
                <div className="row">
                    <Routes>
                        <Route path="/" element={<RecipePlanner />}></Route>
                        <Route path="/about" element={<About />}></Route>
                        <Route path="/contact" element={<Contact />}></Route>
                        <Route path="/*" element={<NotFound />}></Route>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
