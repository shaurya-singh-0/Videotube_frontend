import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VideoCard from "../components/VideoCard"

function Profile() {
    const [user, setUser] = useState(null)
    const [videos, setVideos] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(true)
    // const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userResponse = await axiosInstance.get("/users/current-user")
                console.log("user data:", userResponse.data.data)
                setUser(userResponse.data.data)

                const videosResponse = await axiosInstance.get(`/videos?userId=${userResponse.data.data._id}`)
                setVideos(videosResponse.data.data.docs)
            } catch (error) {
                console.log("error:", error)
            }
        }
        fetchProfile()
    }, [])

    if(!user) return (
        <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
            <div className="text-white text-lg">Loading...</div>
        </div>
    )

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white">
            <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
            <div className="flex pt-14">
                <Sidebar isOpen={sidebarOpen} />
                <main className={`flex-1 min-w-0 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>

                    {/* Cover Image - full width */}
                    <div className="w-full h-48 bg-gray-800 overflow-hidden">
                        {user.coverImage
                            ? <img src={user.coverImage} className="w-full h-full object-cover" />
                            : <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-700" />
                        }
                    </div>

                    <div className="px-8 py-6">
                        {/* Avatar and Info */}
                        <div className="flex items-end gap-5 -mt-12 mb-8">
                            <img
                                src={user.avatar}
                                className="w-24 h-24 rounded-full object-cover border-4 border-[#0f0f0f] flex-shrink-0"
                            />
                            <div className="mb-2">
                                <h1 className="text-2xl font-bold text-white">{user.fullname}</h1>
                                <p className="text-gray-400 text-sm">@{user.username}</p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                                <p className="text-gray-400 text-sm mt-1">{videos.length} videos</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-b border-gray-800 mb-6" />

                        {/* Videos */}
                        <h2 className="text-lg font-semibold mb-4">My Videos</h2>
                        {videos.length === 0
                            ? <p className="text-gray-500">No videos uploaded yet.</p>
                            : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {videos.map((video) => (
                                    <VideoCard key={video._id} video={video} />
                                ))}
                            </div>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile