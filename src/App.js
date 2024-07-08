import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Uploader from "./components/Uploader";
import Result from "./components/Result";

function App() {
    return (
        <div className="App">
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Uploader />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
