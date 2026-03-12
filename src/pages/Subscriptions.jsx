import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function Subscriptions() {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const userResponse = await axiosInstance.get("/users/current-user")
                const userId = userResponse.data.data._id
                const response = await axiosInstance.get(`/subscriptions/subscribed-channels/${userId}`)
                setChannels(response.data.data)
            } catch (error) {
                console.log("error:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSubscriptions()
    }, [])

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white">
            <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
            <div className="flex pt-14">
                <Sidebar isOpen={sidebarOpen} />
                <main className={`flex-1 min-w-0 p-6 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>
                    <h1 className="text-xl font-semibold mb-6">Subscriptions</h1>

                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-gray-400">Loading...</p>
                        </div>
                    ) : channels.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-60 gap-4">
                            <p className="text-gray-400 text-lg">No subscriptions yet</p>
                            <button
                                onClick={() => navigate("/home")}
                                className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                            >
                                Browse Videos
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {channels.map((sub) => (
                                <div
                                    key={sub._id}
                                    className="flex flex-col items-center gap-2 cursor-pointer group"
                                    onClick={() => navigate(`/channel/${sub.channel?._id}`)}
                                >
                                    <img
                                        src={sub.channel?.avatar}
                                        className="w-16 h-16 rounded-full object-cover group-hover:ring-2 group-hover:ring-white transition"
                                    />
                                    <p className="text-sm font-medium text-center line-clamp-1">
                                        {sub.channel?.username}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {sub.channel?.fullname}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Subscriptions