import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"

function VideoPlayer() {
    const { videoId } = useParams()
    const [video, setVideo] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [liked, setLiked] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [channelId, setChannelId] = useState(null)

    useEffect(() => {
        const fetchVideo = async () => {
            const response = await axiosInstance.get(`/videos/${videoId}`)
            setVideo(response.data.data)
            setChannelId(response.data.data.owner)
        }

        const fetchComments = async () => {
            const response = await axiosInstance.get(`/comments/video/${videoId}`)
            setComments(response.data.data.docs)
        }

        const fetchLikeStatus = async () => {
            const response = await axiosInstance.get(`/likes/videos`)
            const likedVideos = response.data.data
            const isLiked = likedVideos.some(item => item.video?._id === videoId)
            setLiked(isLiked)
        }

        fetchVideo()
        fetchComments()
        fetchLikeStatus()
    }, [videoId])

    const handleSubscribe = async () => {
        try {
           await axiosInstance.post(`/subscriptions/toggle-subscription/${channelId}`)
            setSubscribed(prev => !prev)
        } catch (error) {
            console.log("error:", error)
        }
    }

    const handleLike = async () => {
        try {
            await axiosInstance.patch(`/likes/toggle-video-like/${videoId}`)
            setLiked(prev => !prev)
        } catch (error) {
            console.log("error:", error)
        }
    }

    const handleAddComment = async () => {
        if(!newComment) return
        await axiosInstance.post(`/comments/add/${videoId}`, {
            content: newComment
        })
        setNewComment("")
        const response = await axiosInstance.get(`/comments/video/${videoId}`)
        setComments(response.data.data.docs)
    }

    if(!video) return <div className="text-white p-4">Loading...</div>

    return (
        <div>
            <Navbar />
            <div className="p-4 max-w-4xl mx-auto">
                <video
                    src={video.videoFile}
                    controls
                    className="w-full rounded"
                />

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <h1 className="text-xl font-bold">{video.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSubscribe}
                            className={`px-4 py-2 rounded ${subscribed ? "bg-gray-500 text-white" : "bg-red-500 text-white"}`}
                        >
                            {subscribed ? "Unsubscribe" : "Subscribe"}
                        </button>
                        <button
                            onClick={handleLike}
                            className={`px-4 py-2 rounded ${liked ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                        >
                            {liked ? "👍 Liked" : "👍 Like"}
                        </button>
                    </div>
                </div>

                <p className="text-gray-500 mt-2">{video.description}</p>

                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-4">Comments</h2>

                    <div className="flex gap-2 mb-6">
                        <input
                            className="border p-2 rounded flex-1 bg-gray-800 text-white"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleAddComment}
                        >
                            Post
                        </button>
                    </div>

                    {comments.map((comment) => (
                        <div key={comment._id} className="flex gap-3 mb-4">
                            <img
                                src={comment.owner?.avatar}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-sm">{comment.owner?.username}</p>
                                <p className="text-gray-400 text-sm">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer