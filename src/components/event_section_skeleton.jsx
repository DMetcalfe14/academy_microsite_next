import EventCardSkeleton from "@/components/event_card_skeleton";

const EventSectionSkeleton = () => {
  return (
    <div>
      {/* Title Placeholder */}
      <h2 className="text-2xl font-semibold mb-4 bg-gray-300 animate-pulse h-8 w-1/3 rounded"></h2>

      {/* Event Cards Placeholder */}
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}

        {/* "View All" Link Placeholder */}
        <div className="font-semibold flex items-center mt-5">
          <div className="h-6 bg-gray-300 animate-pulse rounded w-[100px]"></div>
          <div className="h-6 bg-gray-300 animate-pulse rounded w-[20px] ml-2"></div>
        </div>
      </div>
    </div>
  );
};

export default EventSectionSkeleton;
