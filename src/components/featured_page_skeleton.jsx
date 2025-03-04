const FeaturedPageSkeleton = () => {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6"
        aria-hidden="true"
      >
        {/* Left Column Skeleton */}
        <div className="lg:col-span-1">
          <div className="h-8 bg-gray-300 animate-pulse rounded mb-4"></div>
          <div className="h-6 bg-gray-300 animate-pulse rounded mb-5"></div>
          <div className="h-6 bg-gray-300 animate-pulse rounded w-[50%] mb-5"></div>
        </div>
  
        {/* Right Column Skeleton */}
        <div className="col-span-3">
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse h-[300px] rounded-lg mb-4"></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FeaturedPageSkeleton;
  