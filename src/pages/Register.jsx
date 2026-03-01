import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"

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

            const response = await axiosInstance.post("/users/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            console.log("registered:", response.data)
            alert("Registered successfully!")
            navigate("/")

        } catch (error) {
            console.log("error:", error)
            alert("Registration failed!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col gap-4 w-80">
                <h1 className="text-2xl font-bold">Register</h1>

                <input
                    className="border p-2 rounded"
                    placeholder="Full Name"
                    name="fullname"
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />

                <div>
                    <label className="text-sm text-gray-500">Avatar (required)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-500">Cover Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register