function ShimmerCard() {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-800 rounded-xl h-48 w-full"></div>
            <div className="mt-3 flex gap-3">
                <div className="w-9 h-9 bg-gray-800 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    )
}

export default ShimmerCard