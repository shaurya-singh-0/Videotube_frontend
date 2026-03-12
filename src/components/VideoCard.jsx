import { useNavigate } from "react-router-dom"
import { BsThreeDotsVertical } from "react-icons/bs"

function VideoCard({ video }) {
    const navigate = useNavigate()

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${String(secs).padStart(2, "0")}`
    }

    const formatViews = (views) => {
        if(views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
        if(views >= 1000) return `${(views / 1000).toFixed(1)}K views`
        return `${views} views`
    }

    return (
        <div className="cursor-pointer group">
            {/* Thumbnail */}
            <div
                className="relative overflow-hidden rounded-xl bg-gray-800"
                onClick={() => navigate(`/video/${video._id}`)}
            >
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    {formatDuration(video.duration)}
                </div>
            </div>

            {/* Info */}
            <div className="mt-3 flex gap-3 px-1">
                <img
                    src={video.owner?.avatar}
                    alt={video.owner?.username}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-0.5"
                    onClick={() => navigate(`/video/${video._id}`)}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3
                            className="text-white text-sm font-medium line-clamp-2 leading-snug flex-1 pr-2"
                            onClick={() => navigate(`/video/${video._id}`)}
                        >
                            {video.title}
                        </h3>
                        <BsThreeDotsVertical className="text-gray-400 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1 hover:text-white transition cursor-pointer">
                        {video.owner?.username}
                    </p>
                    <p className="text-gray-400 text-xs">
                        {formatViews(video.views)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard