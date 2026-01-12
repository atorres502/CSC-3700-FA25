import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import homer from "./assets/homer.gif"
import NavBar from './components/NavBar'
import LeftSide from './components/LeftSide'
import RightSideV2 from './components/RightSideV3'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-5">
                        <LeftSide />
                    </div>
                    <div className="col-md-5">
                        <RightSideV2 />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App