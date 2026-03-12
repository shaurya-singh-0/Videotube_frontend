import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VideoCard from "../components/VideoCard"

function LikedVideos() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const response = await axiosInstance.get("/likes/videos")
                const likedVideos = response.data.data
                setVideos(likedVideos)
            } catch (error) {
                console.log("error:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchLikedVideos()
    }, [])

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white">
            <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
            <div className="flex pt-14">
                <Sidebar isOpen={sidebarOpen} />
                <main className={`flex-1 min-w-0 p-6 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>

                    <h1 className="text-xl font-semibold mb-6">Liked Videos</h1>

                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-gray-400">Loading...</p>
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-60 gap-4">
                            <p className="text-gray-400 text-lg">No liked videos yet</p>
                            <button
                                onClick={() => navigate("/home")}
                                className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                            >
                                Browse Videos
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {videos.map((item) => (
                                <div
                                    key={item._id}
                                    className="cursor-pointer group"
                                    onClick={() => navigate(`/video/${item.video?._id}`)}
                                >
                                    <div className="relative overflow-hidden rounded-xl bg-gray-800">
                                        <img
                                            src={item.video?.thumbnail}
                                            alt={item.video?.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="mt-3 flex gap-3 px-1">
                                        <img
                                            src={item.video?.owner?.avatar}
                                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug">
                                                {item.video?.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs mt-1">
                                                {item.video?.owner?.username}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {item.video?.views} views
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default LikedVideos