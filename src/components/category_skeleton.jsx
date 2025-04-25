const CategorySectionSkeleton = () => {
    // Adjust the number of skeleton cards as needed
    const skeletonCards = Array.from({ length: 4 });
  
    return (
      <section aria-labelledby="categories-skeleton">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 py-15">
          {/* Skeleton for heading */}
          <div className="h-7 w-48 bg-gray-300 rounded mb-2 animate-pulse" />
          {/* Skeleton for description */}
          <div className="h-5 w-72 bg-gray-300 rounded mb-6 animate-pulse" />
          {/* Skeleton grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {skeletonCards.map((_, idx) => (
              <div
                key={idx}
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
                <div className="p-6 flex flex-col space-y-4 flex-1">
                  <div className="h-6 bg-gray-400 rounded w-3/4" role="presentation"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/4" role="presentation"></div>
                  <div className="h-4 bg-gray-400 rounded w-full" role="presentation"></div>
                  <div className="h-4 bg-gray-400 rounded w-5/6" role="presentation"></div>
                  <div className="h-4 bg-gray-400 rounded w-[90%]" role="presentation"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default CategorySectionSkeleton;
  