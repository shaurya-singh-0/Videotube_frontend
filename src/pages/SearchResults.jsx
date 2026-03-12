import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VideoCard from "../components/VideoCard"
import ShimmerCard from "../components/ShimmerCard"

function SearchResults() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/videos?query=${query}`)
                setVideos(response.data.data.docs)
            } catch (error) {
                console.log("error:", error)
            } finally {
                setLoading(false)
            }
        }
        if(query) fetchResults()
    }, [query])

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white">
            <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
            <div className="flex pt-14">
                <Sidebar isOpen={sidebarOpen} />
                <main className={`flex-1 min-w-0 p-6 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>

                    <h1 className="text-lg font-semibold mb-6">
                        Search results for <span className="text-white">"{query}"</span>
                    </h1>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array(8).fill(0).map((_, i) => <ShimmerCard key={i} />)}
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-60 gap-4">
                            <p className="text-gray-400 text-lg">No videos found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {videos.map((video) => (
                                <VideoCard key={video._id} video={video} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default SearchResults