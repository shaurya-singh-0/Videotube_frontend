import { useNavigate } from "react-router-dom"

function Sidebar() {
    const navigate = useNavigate()

    const items = [
        { icon: "🏠", label: "Home", path: "/home" },
        { icon: "👤", label: "You", path: "/profile" },
        { icon: "👍", label: "Liked Videos", path: "/liked" },
        { icon: "📤", label: "Upload", path: "/upload" },
    ]

    return (
        <div className="w-56 bg-gray-950 min-h-screen pt-4 fixed left-0 top-14">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl mx-2"
                    onClick={() => navigate(item.path)}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-white">{item.label}</span>
                </div>
            ))}
        </div>
    )
}

export default Sidebar