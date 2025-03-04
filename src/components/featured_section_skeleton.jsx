import ToggleSkeleton from "./toggle_skeleton";
import FeaturedPageSkeleton from "./featured_page_skeleton";

const FeaturedSectionSkeleton = () => {
  return (
    <section className="bg-primary_saturated">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 py-15">
        {/* Toggle Skeleton */}
        <div className="flex gap-3 mb-10">
          {Array.from({ length: 2 }).map((_, index) => (
            <ToggleSkeleton key={index} />
          ))}
        </div>

        {/* Featured Page Skeleton */}
        <FeaturedPageSkeleton />
      </div>
    </section>
  );
};

export default FeaturedSectionSkeleton;
