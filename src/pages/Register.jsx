import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"
import { RiYoutubeLine } from "react-icons/ri"

function Register() {
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: ""
    })
    const [avatar, setAvatar] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async () => {
        try {
            setLoading(true)
            const data = new FormData()
            data.append("fullname", formData.fullname)
            data.append("username", formData.username)
            data.append("email", formData.email)
            data.append("password", formData.password)
            data.append("avatar", avatar)
            if(coverImage) data.append("coverImage", coverImage)

            await axiosInstance.post("/users/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            alert("Registered successfully!")
            navigate("/login")
        } catch (error) {
            console.log("error:", error)
            alert("Registration failed!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#0f0f0f] flex justify-center items-center py-10">
            <div className="flex flex-col gap-5 w-full max-w-sm px-6">

                {/* Logo */}
                <div className="flex items-center gap-2 justify-center mb-2">
                    <RiYoutubeLine size={40} className="text-red-600" />
                    <span className="text-white font-bold text-2xl">VideoTube</span>
                </div>

                <h2 className="text-white text-xl font-semibold text-center">Create account</h2>

                <input
                    className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue-500 placeholder-gray-500"
                    placeholder="Full Name"
                    name="fullname"
                    onChange={handleChange}
                />
                <input
                    className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue-500 placeholder-gray-500"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue-500 placeholder-gray-500"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue-500 placeholder-gray-500"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />

                {/* Avatar */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-xs">Avatar (required)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-400 text-sm w-full file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                    />
                </div>

                {/* Cover Image */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-xs">Cover Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        className="bg-[#121212] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-400 text-sm w-full file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                    />
                </div>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition text-center"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register