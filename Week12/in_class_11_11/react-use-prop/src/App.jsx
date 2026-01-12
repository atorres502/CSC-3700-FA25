import NavBar from './components/NavBar'
import BookHomeV2 from './components/BookHomeV2'

function App() {
    return (
        <>
            <NavBar />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Books 4 U!</h2>
                    </div>
                    <div className="col-md-6">
                        <BookHomeV2 />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
