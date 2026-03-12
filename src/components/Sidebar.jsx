import { useNavigate, useLocation } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineSubscriptions } from "react-icons/md"
import { BiLike } from "react-icons/bi"
import { RiVideoUploadLine } from "react-icons/ri"
import { FaUserCircle } from "react-icons/fa"

const menuItems = [
    { icon: <AiOutlineHome size={22} />, label: "Home", path: "/home" },
    { icon: <FaUserCircle size={22} />, label: "You", path: "/profile" },
    { icon: <MdOutlineSubscriptions size={22} />, label: "Subscriptions", path: "/subscriptions" },
    { icon: <BiLike size={22} />, label: "Liked Videos", path: "/liked" },
    { icon: <RiVideoUploadLine size={22} />, label: "Upload", path: "/upload" },
]

function Sidebar({ isOpen }) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <aside className={`fixed left-0 top-14 h-[calc(100vh-56px)] bg-[#0f0f0f] pt-3 z-40 overflow-y-auto shrink-0 transition-all duration-300
            ${isOpen ? "w-60" : "w-0 overflow-hidden"}`}
        >
            {menuItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                    <div
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-5 px-5 py-2.5 rounded-xl mx-2 cursor-pointer transition-all whitespace-nowrap
                            ${isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                    >
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </div>
                )
            })}
        </aside>
    )
}

export default Sidebar