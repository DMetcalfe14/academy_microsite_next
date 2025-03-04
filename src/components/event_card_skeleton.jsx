const EventCardSkeleton = () => {
    return (
      <div className="relative flex flex-col md:flex-row w-full bg-gray-200 border border-slate-200 rounded-lg overflow-hidden animate-pulse">
        {/* Left Section (Image and Date Placeholder) */}
        <div className="relative md:w-2/5 shrink-0 overflow-hidden">
          <div className="bg-gray-300 text-6xl text-white absolute w-full h-full flex justify-center items-center text-center rounded-l-lg"></div>
          <div className="h-full w-full bg-gray-300"></div>
        </div>
  
        {/* Right Section (Content Placeholder) */}
        <div className="p-6 flex flex-col space-y-4">
          {/* Location Placeholder */}
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  
          {/* Title Placeholder */}
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
  
          {/* Description Placeholder */}
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-[90%]"></div>
        </div>
      </div>
    );
  };
  
  export default EventCardSkeleton;
  