const CardSectionSkeleton = ({ perRow, perPage, paginated }) => {

  const total = Math.max(perPage, perRow);

  const html = (
    <>
      {/* Title Placeholder */}
      <h2 className="text-2xl font-semibold mb-4 bg-gray-300 animate-pulse h-8 w-1/3 rounded"></h2>

      {/* Cards Grid Placeholder */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${perRow} gap-6`}
      >
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse h-[300px] rounded-lg"
          ></div>
        ))}
      </div>

      {paginated && (
        <div className="flex items-center gap-8 place-content-between mt-8">
          <button
            className="px-4 py-2 bg-gray-300 animate-pulse rounded font-semibold w-[60px] h-[40px]"
            type="button"
            aria-label="Previous page button placeholder"
            disabled
          ></button>

          <p className="text-sm text-gray-400">
            Page{" "}
            <span className="bg-gray-300 animate-pulse inline-block h-[20px] w-[30px] rounded"></span>{" "}
            of{" "}
            <span className="bg-gray-300 animate-pulse inline-block h-[20px] w-[30px] rounded"></span>
          </p>

          <button
            className="px-4 py-2 bg-gray-300 animate-pulse rounded font-semibold w-[60px] h-[40px]"
            type="button"
            aria-label="Next page button placeholder"
            disabled
          ></button>
        </div>
      )}
    </>
  );

  return paginated ? html : <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{html}</div>;
};

export default CardSectionSkeleton;
