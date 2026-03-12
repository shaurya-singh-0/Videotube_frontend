import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"
import { AiOutlineSearch } from "react-icons/ai"
import { MdOutlineVideoCall } from "react-icons/md"
import { RiYoutubeLine } from "react-icons/ri"

function Navbar({ onToggleSidebar }) {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/users/current-user")
                setAvatar(response.data.data.avatar)
            } catch (error) {
                console.log("error:", error)
            }
        }
        fetchUser()
    }, [])

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/users/logout")
        } catch (error) {
            console.log("error:", error)
        } finally {
            navigate("/login")
        }
    }

    const handleSearch = (e) => {
        if(e.key === "Enter" && searchQuery.trim()){
            navigate(`/search?q=${searchQuery}`)
        }
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-[#0f0f0f] h-14">
            <div className="flex items-center gap-4 min-w-[220px]">
                <button
                    className="p-2 rounded-full hover:bg-gray-800 transition text-white"
                    onClick={onToggleSidebar}
                >
                    <div className="space-y-1.5">
                        <div className="w-5 h-0.5 bg-white"></div>
                        <div className="w-5 h-0.5 bg-white"></div>
                        <div className="w-5 h-0.5 bg-white"></div>
                    </div>
                </button>
                <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => navigate("/home")}
                >
                    <RiYoutubeLine size={32} className="text-red-600" />
                    <span className="text-white font-bold text-lg tracking-tight">VideoTube</span>
                </div>
            </div>

            <div className="flex items-center flex-1 max-w-2xl mx-8">
                <input
                    className="flex-1 bg-[#121212] border border-gray-700 rounded-l-full px-5 py-2 text-sm text-white outline-none focus:border-blue-500 placeholder-gray-500"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <button className="bg-[#222222] border border-gray-700 border-l-0 rounded-r-full px-5 py-2.5 hover:bg-gray-700 transition">
                    <AiOutlineSearch size={20} className="text-white" />
                </button>
            </div>

            <div className="flex items-center gap-3 min-w-[220px] justify-end">
                <button
                    onClick={() => navigate("/upload")}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-600 text-white text-sm hover:bg-gray-800 transition"
                >
                    <MdOutlineVideoCall size={20} />
                    <span>Create</span>
                </button>
                <button
                    onClick={() => navigate("/profile")}
                    className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-600 hover:border-white transition flex-shrink-0"
                >
                    {avatar
                        ? <img src={avatar} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">P</div>
                    }
                </button>
                <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-full bg-transparent border border-gray-600 text-white text-sm hover:bg-gray-800 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar