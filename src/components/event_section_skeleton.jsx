import EventCardSkeleton from "@/components/event_card_skeleton";

const EventSectionSkeleton = () => {
  return (
    <div aria-hidden="true">

      <h2 
        className="text-2xl font-semibold mb-4 bg-gray-400 animate-pulse h-8 w-1/3 rounded" 
        role="presentation"
      ></h2>

      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}

        <div className="font-semibold flex items-center mt-5" role="presentation">
          <div 
            className="h-6 bg-gray-400 animate-pulse rounded w-[100px]" 
            role="presentation"
          ></div>
          <div 
            className="h-6 bg-gray-400 animate-pulse rounded w-[20px] ml-2" 
            role="presentation"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EventSectionSkeleton;
