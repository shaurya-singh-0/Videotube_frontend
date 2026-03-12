import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import VideoPlayer from "./pages/VideoPlayer"
import UploadVideo from "./pages/UploadVideo"
import Profile from "./pages/Profile"
import Subscriptions from "./pages/Subscriptions"
import LikedVideos from "./pages/LikedVideos"
import SearchResults from "./pages/SearchResults"



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/video/:videoId" element={<VideoPlayer />} />
                <Route path="/upload" element={<UploadVideo />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/liked" element={<LikedVideos />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App