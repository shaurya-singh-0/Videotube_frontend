import { useEffect, useState } from "react"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

function Home() {
    const [videos, setVideos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axiosInstance.get("/videos")
            setVideos(response.data.data.docs)
        }
        fetchVideos()
    }, [])

    return (
        <div className="bg-gray-950 min-h-screen text-white">
            <Navbar />
            <div className="flex">
                <Sidebar />
                {/* Main Content */}
                <div className="ml-56 p-6 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div
                                key={video._id}
                                className="cursor-pointer group"
                                onClick={() => navigate(`/video/${video._id}`)}
                            >
                                {/* Thumbnail */}
                                <div className="relative overflow-hidden rounded-xl">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                                        {Math.floor(video.duration / 60)}:{String(Math.floor(video.duration % 60)).padStart(2, "0")}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="mt-3 flex gap-3">
                                    <img
                                        src={video.owner?.avatar}
                                        className="w-9 h-9 rounded-full object-cover mt-1 shrink-0"
                                    />
                                    <div>
                                        <h2 className="font-semibold text-sm line-clamp-2 leading-snug">
                                            {video.title}
                                        </h2>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {video.owner?.username}
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            {video.views} views
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home