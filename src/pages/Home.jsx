import { useEffect, useState } from "react"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VideoCard from "../components/VideoCard"
import ShimmerCard from "../components/ShimmerCard"

function Home() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axiosInstance.get("/videos")
                setVideos(response.data.data.docs)
            } catch (error) {
                console.log("error:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchVideos()
    }, [])

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white">
            <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
            <div className="flex pt-14">
                <Sidebar isOpen={sidebarOpen} />
                <main className={`flex-1 min-w-0 p-6 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {loading
                            ? Array(8).fill(0).map((_, i) => <ShimmerCard key={i} />)
                            : videos.map((video) => (
                                <VideoCard key={video._id} video={video} />
                            ))
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home