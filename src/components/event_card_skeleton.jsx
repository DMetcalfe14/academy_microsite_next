const EventCardSkeleton = () => {
  return (
    <div 
      className="relative flex flex-col md:flex-row w-full bg-gray-300 border border-gray-400 rounded-lg overflow-hidden animate-pulse"
      aria-hidden="true"
    >

      <div className="relative md:w-2/5 shrink-0 overflow-hidden">
        <div 
          className="bg-gray-400 text-6xl text-label absolute w-full h-full flex justify-center items-center text-center rounded-l-lg" 
          role="presentation"
        ></div>
        <div className="h-full w-full bg-gray-400" role="presentation"></div>
      </div>

      <div className="p-6 flex flex-col space-y-4">
        <div className="h-4 bg-gray-400 rounded w-1/4" role="presentation"></div>
        <div className="h-6 bg-gray-400 rounded w-3/4" role="presentation"></div>
        <div className="h-4 bg-gray-400 rounded w-full" role="presentation"></div>
        <div className="h-4 bg-gray-400 rounded w-5/6" role="presentation"></div>
        <div className="h-4 bg-gray-400 rounded w-[90%]" role="presentation"></div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;