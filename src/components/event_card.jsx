const EventCard = ({
  id,
  title,
  description,
  image,
  alt,
  day,
  month,
  location,
}) => {
  return (
    <article
      className="relative flex flex-col md:flex-row w-full bg-white border border-slate-200 rounded-lg overflow-hidden"
      aria-labelledby={`event-card-title-${id}`}
    >
      {/* Event Date */}
      <div className="relative md:w-2/5 shrink-0 overflow-hidden">
        <div
          className="bg-[#00000080] text-6xl text-white absolute w-full h-full overflow-hidden flex justify-center items-center text-center"
          aria-label={`Event start date: ${day} of ${month}`}
        >
          {day}
          <br />
          {month}
        </div>
        <img
          src={image}
          alt={alt}
          className="h-full w-full md:rounded-l-lg @sm:rounded-t-lg object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="p-6">
        <a
          href={`search.html?location=${location}`}
          className="text-primary hover:text-orange-600 font-semibold text-sm focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label={`Search events in ${location}`}
        >
          {location}
        </a>
        <h3
          id={`event-card-title-${id}`}
          className="mb-2 mt-2 text-lg font-semibold line-clamp-2"
        >
          <a
            href={`details.html?id=${id}`}
            className="hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            aria-label={`View details for event: ${title}`}
          >
            {title}
          </a>
        </h3>
        <p className="mb-4 line-clamp-3 text-gray-700">{description}</p>
      </div>
    </article>
  );
};

export default EventCard;