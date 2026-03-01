import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"

function Profile() {
    const [user, setUser] = useState(null)
    const [videos, setVideos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userResponse = await axiosInstance.get("/users/current-user")
                setUser(userResponse.data.data)

                const videosResponse = await axiosInstance.get("/videos")
                setVideos(videosResponse.data.data.docs)
            } catch (error) {
                console.log("error:", error)
            }
        }
        fetchProfile()
    }, [])

    if(!user) return <div className="text-white p-4">Loading...</div>

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">

                {/* Cover Image */}
                <div className="w-full h-48 bg-gray-700 rounded overflow-hidden">
                    {user.coverImage && (
                        <img
                            src={user.coverImage}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Avatar and Info */}
                <div className="flex items-center gap-4 mt-4">
                    <img
                        src={user.avatar}
                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-900"
                    />
                    <div>
                        <h1 className="text-xl font-bold">{user.fullname}</h1>
                        <p className="text-gray-500">@{user.username}</p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* Videos */}
                <h2 className="text-xl font-bold mt-8 mb-4">My Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <div
                            key={video._id}
                            className="border rounded overflow-hidden cursor-pointer hover:opacity-80"
                            onClick={() => navigate(`/video/${video._id}`)}
                        >
                            <img
                                src={video.thumbnail}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-2">
                                <h3 className="font-semibold">{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile