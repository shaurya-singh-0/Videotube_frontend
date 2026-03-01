import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"

function UploadVideo() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [videoFile, setVideoFile] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleUpload = async () => {
        try {
            setLoading(true)
            const data = new FormData()
            data.append("title", title)
            data.append("description", description)
            data.append("videoFile", videoFile)
            data.append("thumbNailFile", thumbnail)

            await axiosInstance.post("/videos/publish-video", data, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            alert("Video uploaded successfully!")
            navigate("/home")
        } catch (error) {
            console.log("error:", error)
            alert("Upload failed!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col gap-4 w-96">
                    <h1 className="text-2xl font-bold">Upload Video</h1>

                    <input
                        className="border p-2 rounded"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="border p-2 rounded"
                        placeholder="Description"
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div>
                        <label className="text-sm text-gray-500">Video File</label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideoFile(e.target.files[0])}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">Thumbnail</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadVideo