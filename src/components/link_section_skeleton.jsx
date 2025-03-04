import QuickLinkSkeleton from "./quick_link_skeleton";

const LinkSectionSkeleton = () => {
  return (
    <div>
      {/* Title Placeholder */}
      <h2 className="text-2xl font-semibold mb-4 bg-gray-300 animate-pulse h-8 w-1/3 rounded"></h2>

      {/* Quick Links Grid Placeholder */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <QuickLinkSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default LinkSectionSkeleton;
