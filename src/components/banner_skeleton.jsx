const BannerSkeleton = () => (
  <div
    className="relative w-full left-1/2 right-1/2 -translate-x-1/2 overflow-hidden"
    aria-hidden="true"
  >
    <div className="relative h-full">
      <div 
        className="absolute inset-0 w-full h-full bg-gray-400 animate-pulse"
        role="presentation"
      ></div>
      
      <div 
        className="relative z-20 pt-40 pb-10 h-full flex flex-col justify-end bg-gradient-to-t from-black via-gray-900 to-transparent"
        role="presentation"
      >
        <div className="mx-auto max-w-7xl px-8 w-full" role="presentation">
          <div className="h-10 w-3/4 bg-gray-500 animate-pulse rounded"role="presentation"></div>
          <div className="h-6 w-1/2 bg-gray-500 animate-pulse rounded mt-4 mb-6" role="presentation"></div>
          <div className="h-10 w-32 bg-gray-500 animate-pulse rounded" role="presentation"></div>
        </div>
      </div>
    </div>
  </div>
);

export default BannerSkeleton;