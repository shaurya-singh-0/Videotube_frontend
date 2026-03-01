import { useState } from "react"
import axiosInstance from "../utils/axios"

import { useNavigate } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/users/login", {
                username,
                password
            })
            console.log("response:", response.data)
            navigate("/")
        } catch (error) {
            console.log("error:", error)
            alert("Invalid username or password")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 w-80">
                <h1 className="text-2xl font-bold">Login</h1>
                <input
                    className="border p-2 rounded"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className="text-center text-sm">
    Don't have an account?{" "}
    <span
        className="text-blue-500 cursor-pointer"
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