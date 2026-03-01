import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import VideoPlayer from "./pages/VideoPlayer"
import UploadVideo from "./pages/UploadVideo"
import Profile from "./pages/Profile"



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/video/:videoId" element={<VideoPlayer />} />
                <Route path="/upload" element={<UploadVideo />} />  
                <Route path="/profile" element={<Profile />} />


            </Routes>
        </BrowserRouter>
    )
}

export default App