const CardSkeleton = () => {
  return (
    <div 
      className="flex flex-col bg-gray-400 border border-gray-500 rounded-lg animate-pulse"
      aria-hidden="true"
    >

      <div 
        className="relative aspect-video overflow-hidden rounded-t-lg bg-gray-500"
        role="presentation"
      ></div>

      <div className="p-4 space-y-4">

        <div className="h-5 bg-gray-500 rounded w-3/4" role="presentation"></div>

        <div className="h-4 bg-gray-500 rounded w-full" role="presentation"></div>
        <div className="h-4 bg-gray-500 rounded w-5/6" role="presentation"></div>

        <div className="flex gap-2 mt-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className="h-6 w-16 bg-gray-500 rounded" role="presentation"></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;