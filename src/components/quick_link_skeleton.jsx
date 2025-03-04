const QuickLinkSkeleton = () => {
    return (
      <div className="flex gap-4 items-center group font-semibold animate-pulse">
        {/* Icon Placeholder */}
        <span className="p-4 rounded-xl bg-gray-300 text-3xl w-[56px] h-[56px]"></span>
  
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  };
  
  export default QuickLinkSkeleton;
  