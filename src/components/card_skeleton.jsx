const CardSkeleton = () => {
    return (
      <div className="flex flex-col bg-gray-200 border border-gray-light rounded-lg animate-pulse">
        {/* Thumbnail Section */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg bg-gray-300"></div>
  
        {/* Content Section */}
        <div className="p-4 space-y-4">
          {/* Title Placeholder */}
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
  
          {/* Description Placeholder */}
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  
          {/* Tags Placeholder */}
          <div className="flex gap-2 mt-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={index}
                className="h-6 w-16 bg-gray-300 rounded"
              ></span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default CardSkeleton;
  