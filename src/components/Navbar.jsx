import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/users/logout")
            navigate("/")
        } catch (error) {
            console.log("error:", error)
        }
    }

    return (
        <nav className="flex justify-between items-center px-4 py-2 bg-gray-950 text-white sticky top-0 z-10">
            {/* Left - Logo */}
            <div className="flex items-center gap-4">
                <span className="text-2xl cursor-pointer">☰</span>
                <span
                    className="text-xl font-bold text-red-500 cursor-pointer"
                    onClick={() => navigate("/home")}
                >
                    📺 VideoTube
                </span>
            </div>

            {/* Middle - Search */}
            <div className="flex items-center gap-2 w-96">
                <input
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-l-full px-4 py-1.5 text-sm outline-none"
                    placeholder="Search"
                />
                <button className="bg-gray-800 border border-gray-700 px-4 py-1.5 rounded-r-full">
                    🔍
                </button>
            </div>

            {/* Right - Buttons */}
            <div className="flex items-center gap-3">
                <button
                    className="flex items-center gap-1 border border-gray-600 px-3 py-1.5 rounded-full text-sm hover:bg-gray-800"
                    onClick={() => navigate("/upload")}
                >
                    + Create
                </button>
                <button
                    className="bg-gray-800 px-3 py-1.5 rounded-full text-sm hover:bg-gray-700"
                    onClick={() => navigate("/profile")}
                >
                    👤 Profile
                </button>
                <button
                    className="bg-red-600 px-3 py-1.5 rounded-full text-sm hover:bg-red-700"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar