import { useState } from "react"
import axiosInstance from "../utils/axios"
import { useNavigate } from "react-router-dom"
import { RiYoutubeLine } from "react-icons/ri"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            setLoading(true)
            await axiosInstance.post("/users/login", { username, password })
            navigate("/home")
        } catch (error) {
            console.log("error:", error)
            alert("Invalid username or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#0f0f0f] flex justify-center items-center">
            <div className="flex flex-col gap-5 w-full max-w-sm px-6">

                {/* Logo */}
                <div className="flex items-center gap-2 justify-center mb-4">
                    <RiYoutubeLine size={40} className="text-red-600" />
                    <span className="text-white font-bold text-2xl">VideoTube</span>
                </div>

                <h2 className="text-white text-xl font-semibold text-center">Sign in</h2>

                <input
                    className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue-500 placeholder-gray-500"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue-500 placeholder-gray-500"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition text-center"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login