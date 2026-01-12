import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import homer from "./assets/homer.gif"
import NavBar from './components/NavBar'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2> Hello World</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h2> Hello World</h2>
                        <button className="btn btn-primary"> Click me</button>
                        <span className="special"> Does this work?</span>
                        <img src={homer} className="homer" alt="homer" loading="lazy" />
                        <img src="assets/homer2.png" className="homer" alt="homer2" loading="lazy" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
