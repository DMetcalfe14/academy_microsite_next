const BannerSkeleton = () => (
    <div className="relative w-full left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
      <div className="relative h-full">
        <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse"></div>
        <div className="relative z-20 pt-40 pb-10 h-full flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
          <div className="mx-auto max-w-7xl px-8 w-full">
            <div className="h-10 w-3/4 bg-gray-400 animate-pulse rounded"></div>
            <div className="h-6 w-1/2 bg-gray-400 animate-pulse rounded mt-4 mb-6"></div>
            <div className="h-10 w-32 bg-gray-400 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default BannerSkeleton;
  