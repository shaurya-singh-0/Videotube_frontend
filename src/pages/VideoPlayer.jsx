import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../utils/axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VideoCard from "../components/VideoCard"
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { BiDislike } from "react-icons/bi"
import { PiShareFatLight } from "react-icons/pi"

function VideoPlayer() {
    const { videoId } = useParams()
    const [video, setVideo] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [liked, setLiked] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [channelId, setChannelId] = useState(null)
    const [suggestedVideos, setSuggestedVideos] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        const fetchVideo = async () => {
            const response = await axiosInstance.get(`/videos/${videoId}`)
            // setVideo(response.data.data)
            // setChannelId(response.data.data.owner._id)
            const data = response.data.data
    console.log("video data:", data)
    console.log("owner:", data.owner)
    console.log("channelId:", data.owner?._id)
    setVideo(data)
    setChannelId(data.owner?._id)
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

        const fetchSuggestedVideos = async () => {
            const response = await axiosInstance.get("/videos")
            const all = response.data.data.docs
            setSuggestedVideos(all.filter(v => v._id !== videoId))
        }

        fetchVideo()
        fetchComments()
        fetchLikeStatus()
        fetchSuggestedVideos()
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

    const formatViews = (views) => {
        if(views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
        if(views >= 1000) return `${(views / 1000).toFixed(1)}K`
        return views
    }

    if(!video) return (
        <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
            <div className="text-white text-lg">Loading...</div>
        </div>
    )

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white">
            <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
            <Sidebar isOpen={sidebarOpen} />

            <div className={`pt-14 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>
                <div className="flex gap-6 p-6">

                    {/* Left - Video + Info + Comments */}
                    <div className="flex-1 min-w-0">

                        {/* Video Player */}
                        <video
                            src={video.videoFile}
                            controls
                            className="w-full rounded-xl bg-black"
                            style={{ maxHeight: "520px" }}
                        />

                        {/* Title */}
                        <h1 className="text-lg font-semibold mt-4 leading-snug">
                            {video.title}
                        </h1>

                        {/* Channel Info + Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">

                            {/* Channel */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={video.owner?.avatar}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-medium">{video.owner?.username}</p>
                                    <p className="text-gray-400 text-xs">{formatViews(video.views)} views</p>
                                </div>
                                <button
                                    onClick={handleSubscribe}
                                    className={`ml-4 px-5 py-2 rounded-full text-sm font-medium transition
                                        ${subscribed
                                            ? "bg-gray-700 text-white hover:bg-gray-600"
                                            : "bg-white text-black hover:bg-gray-200"
                                        }`}
                                >
                                    {subscribed ? "Subscribed" : "Subscribe"}
                                </button>
                            </div>

                            {/* Like/Share buttons */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                                    <button
                                        onClick={handleLike}
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition border-r border-gray-700"
                                    >
                                        {liked
                                            ? <AiFillLike size={20} className="text-blue-400" />
                                            : <AiOutlineLike size={20} />
                                        }
                                        <span className="text-sm">{liked ? "Liked" : "Like"}</span>
                                    </button>
                                    <button className="px-4 py-2 hover:bg-gray-700 transition">
                                        <BiDislike size={20} />
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition text-sm">
                                    <PiShareFatLight size={20} />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-800 rounded-xl p-4 mt-4">
                            <p className="text-sm text-gray-300">{video.description}</p>
                        </div>

                        {/* Comments */}
                        <div className="mt-6">
                            <h2 className="text-base font-semibold mb-4">
                                {comments.length} Comments
                            </h2>

                            {/* Add Comment */}
                            <div className="flex gap-3 mb-6">
                                <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    P
                                </div>
                                <div className="flex-1">
                                    <input
                                        className="w-full bg-transparent border-b border-gray-700 focus:border-white outline-none pb-2 text-sm text-white placeholder-gray-500"
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    {newComment && (
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                className="px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition"
                                                onClick={() => setNewComment("")}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm transition"
                                                onClick={handleAddComment}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Comment List */}
                            {comments.map((comment) => (
                                <div key={comment._id} className="flex gap-3 mb-5">
                                    <img
                                        src={comment.owner?.avatar}
                                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">
                                            @{comment.owner?.username}
                                        </p>
                                        <p className="text-gray-300 text-sm mt-1">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Suggested Videos */}
                    <div className="w-96 flex-shrink-0">
                        <h3 className="text-sm font-semibold mb-4 text-gray-300">
                            Suggested Videos
                        </h3>
                        <div className="flex flex-col gap-3">
                            {suggestedVideos.map((v) => (
                                <div
                                    key={v._id}
                                    className="flex gap-2 cursor-pointer group"
                                    onClick={() => window.location.href = `/video/${v._id}`}
                                >
                                    <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
                                        <img
                                            src={v.thumbnail}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                                            {Math.floor(v.duration / 60)}:{String(Math.floor(v.duration % 60)).padStart(2, "0")}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white text-xs font-medium line-clamp-2 leading-snug">
                                            {v.title}
                                        </h4>
                                        <p className="text-gray-400 text-xs mt-1">{v.owner?.username}</p>
                                        <p className="text-gray-400 text-xs">{formatViews(v.views)} views</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VideoPlayer